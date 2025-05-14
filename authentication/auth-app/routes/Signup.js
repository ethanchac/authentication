const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    console.log("hittt");
    try{
        //Checks if there exists one already
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({msg : 'User already Exists' });
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10); //adds randomness
        const hashedPassword = await bcrypt.hash(password, salt); //encrypts password

        //saving new user
        const newUser = new User({email, password: hashedPassword});
        await newUser.save();

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({ token });
    } catch(err) {
        console.error("Signup error:", err);
        res.status(500).json({ msg: 'Server error' });
    }

});

module.exports = router;