const request = require('supertest');
const { app } = require('../src/server'); 
const { sequelize } = require('../src/auth/models'); 

describe('Authentication Routes Tests', () => {
  beforeAll(async () => {
    // Connect to the database and sync the models
    await sequelize.sync({ force: true }); // This will recreate the database tables
  });

  afterAll(async () => {
    // Close the database connection
    await sequelize.close();
  });

  it('should create a new user with valid signup credentials', async () => {
    // Perform a signup request with valid user data
    const response = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should not create a new user with invalid signup credentials', async () => {
    // Perform a signup request with missing user data
    const response = await request(app)
      .post('/auth/signup')
      .send({
        // Missing username and password
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Error Creating User');
  });
});
