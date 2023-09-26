const { Sequelize } = require('sequelize');
const UserModel = require('./users-models'); // Import the User model

// Create a Sequelize instance and configure it
const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite:memory', {
  dialect: 'postgres', 
});

// Initialize the models
const Users = UserModel(sequelize);

// Export the Sequelize instance and models
module.exports = {
  sequelize,
  Users,
};
