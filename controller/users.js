const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "Hamza";

exports.signup = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
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
