'use strict';

require('dotenv').config();
const { sequelize } = require('./src/auth/models'); //connects to db
const server = require('./src/server.js');
const PORT = process.env.PORT || 3001;

// starts the server
sequelize.sync()
  .then(() => {
    server.start(PORT);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });