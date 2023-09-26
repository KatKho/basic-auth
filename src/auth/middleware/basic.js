const base64 = require('base-64');
const { Users } = require('../models');
const bcrypt = require('bcrypt');

const basicAuth = async (req, res, next) => {
  try {
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'am9objpmb28=']
    let encodedString = basicHeaderParts.pop();  // am9objpmb28=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

    console.log('Username:', username);
    console.log('Password:', password);

    const user = await Users.findOne({ where: { username: username } });

    console.log('User:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const valid = await bcrypt.compare(password, user.password);

    console.log('Valid:', valid);

    if (valid) {
      // Attach the authenticated user to the request object
      req.user = user;
      next();
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    return res.status(403).send('Invalid Login');
  }
};

module.exports = basicAuth;
