const User = require('../Models/User'); // Import the User model
const bcrypt = require('bcryptjs');     // For hashing passwords
const jwt = require('jsonwebtoken');    // For generating JWT tokens

// Function to handle user login
exports.login = async (req, res) => {
    try {
        // Find the user by their username or email
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token to the client
        res.json({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Additional functions for other user-related operations can be added here
