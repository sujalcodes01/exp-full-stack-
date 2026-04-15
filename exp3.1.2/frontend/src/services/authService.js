import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}/auth/login`, {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    const user = this.getCurrentUser();
    return user ? user.token : null;
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return user && user.token;
  }
}

export default new AuthService();