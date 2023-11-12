const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

// Validation rules
const userValidationRules = [
  check('email', 'Please include a valid email').isEmail(),
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

// CREATE User
router.post('/create-user', userValidationRules, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ msg: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
});

// READ Users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Get Single User
router.get('/edit-user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Update User
router.put('/update-user/:id', userValidationRules, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { password } = req.body;
      const updateData = { ...req.body };
  
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }
  
      const user = await User.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

// Delete User
router.delete('/delete-user/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    // Find the user by email
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: 'User with this email does not exist.' });
    }

    // Compare the submitted password with the stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // Define the payload for the JWT
    const payload = {
      user: {
        id: user._id // Make sure you use the property that contains the user's ID
      }
    };

    // Sign the token with the secret key
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // The secret key from your .env file
      { expiresIn: 3600 }, // Token expiry time
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
