// Test script to verify the backend API
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('Testing login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      username: 'admin',
      password: 'password'
    });
    console.log('Login successful:', loginResponse.data);

    const token = loginResponse.data.token;
    console.log('Testing protected route...');
    const protectedResponse = await axios.get(`${API_URL}/protected`, {
      headers: {
        'x-access-token': token
      }
    });
    console.log('Protected route successful:', protectedResponse.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();