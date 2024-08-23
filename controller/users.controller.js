const User = require('../models/user.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "Hamza";
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { role,firstName,lastName,email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(req.body.role);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newUser = new User({
            role,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res,next) => {
    try {
        const { email, role, password } = req.body;
        const user = await User.findOne({ email });
        const firstName = user.firstName;
        const lastName = user.lastName;

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email, userId: user._id  }, secret, {
            expiresIn: '30d', 
        });
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ message: 'Login Successfully', token,role,email,firstName,lastName});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const resetCode = crypto.randomBytes(3).toString('hex').toUpperCase();

    user.resetCode = resetCode;
    user.resetTokenExpiration = Date.now() + 10 * 60 * 1000; 
    await user.save({ validateBeforeSave: false });

    // Securely store your SendGrid API key using environment variables
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    

    if (!SENDGRID_API_KEY) {
      console.error('Missing environment variable SENDGRID_API_KEY');
      return res.status(500).json({ message: 'Internal server error' });
    }

    async function sendPasswordResetEmail(userEmail, resetCode) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(SENDGRID_API_KEY);
      const msg = {
        to: userEmail,
        from: 'skynova804@gmail.com',
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}`,
      };

      try {
        await sgMail.send(msg);
        console.log(`Password reset email sent to ${userEmail}`);
        res.status(200).json({ message: 'Password reset code sent to your email' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }

    await sendPasswordResetEmail(user.email, resetCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    console.log(req.body);
    const { email, resetCode } = req.body;

    const user = await User.findOne({ email, resetCode });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or reset code' });
    }

    if (user.resetTokenExpiration < Date.now()) {
      return res.status(400).json({ message: 'Reset code has expired' });
    }

    res.status(200).json({ message: 'Reset code verified. You can now reset your password.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
  
 
  exports.resetPassword = async (req, res) => {
    try {
      console.log(req.body);
      const { resetCode, email, resetPassword } = req.body;
  
  
      const user = await User.findOne({
        email,
        // resetTokenExpiration: { $gt: Date.now() } 
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset code' });
      }
  
      // const salt = await bcrypt.genSalt(10); // Correct usage
      // const hashedPassword = await bcrypt.hash(newPassword, salt);

      const hashedPassword = await bcrypt.hash(resetPassword, 10);
  
      user.password = hashedPassword;
      user.resetCode = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.viewAdmins = async (req, res, next) => {
    try {
      const admins = await User.find({ role: 'Admin' });
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', 0);
      return res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };