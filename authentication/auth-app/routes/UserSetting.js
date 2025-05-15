const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/color', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { color } = req.body;

  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.selectedColor = color;
    await user.save();

    res.json({ msg: 'Color saved' });
  } catch (err) {
    console.error("Couldn't save color:", err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('TOKEN:', token);

    if (!token) {
      console.log('NO TOKEN');
      return res.status(401).json({ msg: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('DECODED:', decoded);

    const user = await User.findById(decoded.id);
    console.log('USER:', user);

    if (!user) {
      console.log('USER NOT FOUND');
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ favouriteColours: user.favouriteColours, selectedColor: user.selectedColor });

  } catch (err) {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});
router.post('/add-color', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { color } = req.body;

  if (!token) {
    return res.status(401).json({ msg: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.favouriteColours.includes(color)) {
      user.favouriteColours.push(color);
      await user.save();
    }

    return res.json({ favouriteColors: user.favouriteColors });
  } catch (err) {
    console.error('Error adding color:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
