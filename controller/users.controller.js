const User = require('../models/user.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "Hamza";
const nodemailer = require('nodemailer');


exports.signup = async (req, res) => {
    try {
        const { role,userName,email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            role,
            userName,
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
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userName: user.userName }, secret, {
            expiresIn: '1h', 
        });
        res.cookie('token', token, { httpOnly: true });
        
        res.status(200).json({ message: 'Login Successfully', token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000;

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        async function sendPasswordResetEmail(userEmail, resetLink) {
            const transporter = nodemailer.createTransport({
                // Configure your email service details here (e.g., SMTP server, credentials)
            });

            const mailOptions = {
                from: 'SkyNova',
                to: userEmail,
                subject: 'Password Reset Link',
                text: `Click here to reset your password: ${resetLink}`,
            };

            await transporter.sendMail(mailOptions);
        }

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`; // Assuming your frontend has a reset password route
        await sendPasswordResetEmail(user.email, resetLink);

        res.status(200).json({ message: 'Password reset code sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

  exports.resetPassword = async (req, res) => {
    try {
      const { resetToken, newPassword } = req.body;
  
      const user = await User.findOne({
        resetToken,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
