const express = require('express');
const router = express.Router();
const User = require('../Models/User'); 
const authMiddleware = require('../middleware/authMiddleware'); 


router.get('/current', authMiddleware, async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.put('/update', authMiddleware, async (req, res, next) => {
    try {

        const { name, email } = req.body; 
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }


        if (name) user.name = name;
        if (email) user.email = email;


        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
