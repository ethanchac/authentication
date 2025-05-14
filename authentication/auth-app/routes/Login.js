const express = require('express');
const router = express.Router();

router.post('./login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ msg: 'Invalid cred'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'invalid cred'});
        }

        //creates token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});

        //returns token
        res.json({token});

    }catch(err){
        res.status(500).json({msg: 'Server err'})
    }
})

module.exports = router;