const connection = require('./db');

class DatabaseApi {
  constructor() {
    this.connection = connection;
  }

  async createUser(username, email, password) {
    const query = 'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [username, email, password], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  async verifyUser(email, password) {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [email, password], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async checkUserExists(username, email) {
    const query = 'SELECT * FROM users WHERE user_name = ? OR email = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [username, email], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  async getUser(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [email], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  }

  async searchProducts(query) {
    const searchQuery = 'SELECT * FROM products WHERE MATCH(product_name) AGAINST(? IN NATURAL LANGUAGE MODE)';
    return new Promise((resolve, reject) => {
      this.connection.query(searchQuery, [query], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  async getProducts() {
    const query = 'SELECT * FROM products';
    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
}

const databaseApi = new DatabaseApi();

module.exports = databaseApi;