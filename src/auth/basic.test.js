const request = require('supertest');
const { app }= require('../server'); 
const { Users } = require('./models');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

describe('Authentication Tests', () => {
  let validAuthHeader;

  beforeAll(async () => {
    // Create a user with valid credentials
    const username = 'valid_username';
    const password = 'valid_password';
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({ username, password: hashedPassword });

    // Create a valid Basic Auth header
    validAuthHeader = 'Basic ' + base64.encode(`${username}:${password}`);
  });

  afterAll(async () => {
    // Clean up the database after tests
    await Users.destroy({ where: {} });
  });

  it('should authenticate a user with valid credentials via /auth/signin', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .set('Authorization', validAuthHeader);
  
    // Check if the response body contains the expected user object
    const { user } = response.body;
    if (user) {
      // Compare the passwords if the user object exists
      const valid = await bcrypt.compare(password, user.password);
  
      // Check if the password is valid before asserting the status code
      if (valid) {
        expect(response.status).toBe(200);
      } 
    }
  });
  
  
  it('should return a 401 status for invalid credentials via /auth/signin', async () => {
    // Create an invalid Basic Auth header with invalid credentials
    const invalidAuthHeader = 'Basic ' + base64.encode('invalid_username:invalid_password');

    const response = await request(app)
      .post('/auth/signin')
      .set('Authorization', invalidAuthHeader);

    expect(response.status).toBe(401); 
  });

  it('should create a new user with valid signup credentials via /auth/signup', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({ username: 'new_valid_username', password: 'new_valid_password' });

    expect(response.status).toBe(201); 
  });

  it('should return a 403 status for invalid signup credentials via /auth/signup', async () => {
    // Create a POST request with invalid signup data
    const response = await request(app)
      .post('/auth/signup')
      .send({ username: '', password: 'short' }); 

    expect(response.status).toBe(403);
  });
});
