const express = require('express');
const cors = require('cors');

// Prepare the express app
const app = express();

app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Require and use the authentication router
const authRouter = require('./auth/router');
app.use('/auth', authRouter);

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log('Server is running on port ' + PORT);
    });
  },
};