const express = require('express');
const { Users } = require('./models');
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');

const router = express.Router();

// POST route for /signup
router.post('/signup', async (req, res) => {
  try {
    // Validate the incoming data (e.g., username and password length)
    const { username, password } = req.body;

    if (!username || !password || username.length === 0 || password.length === 0) {
      return res.status(403).json({ message: 'Error Creating User' });
    }

    // // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user record
    const record = await Users.create(req.body );
    
    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Error Creating User' });
  }
});


// POST route for /signin
router.post('/signin', basicAuth, (req, res) => {
  const authenticatedUser = req.user;
  console.log('Authenticated User:', authenticatedUser);
  
  // Check if authentication failed
  if (!authenticatedUser) {
    console.log('Authentication failed');
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Authentication succeeded, send a JSON response with the user's database record
  console.log('Authentication succeeded');
  res.status(200).json({ user: authenticatedUser });
});

module.exports = router;
