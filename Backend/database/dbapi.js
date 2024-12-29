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

  async updateUsername(email, newUsername) {
    // 检查用户名是否存在
    const checkQuery = 'SELECT * FROM users WHERE user_name = ?';
    const updateQuery = 'UPDATE users SET user_name = ? WHERE email = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(checkQuery, [newUsername], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length > 0) {
          return reject(new Error('用户名重复'));
        }
        this.connection.query(updateQuery, [newUsername, email], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    });
  }

  async updatePassword(email, oldPassword, newPassword) {
    const verifyQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const updateQuery = 'UPDATE users SET password = ? WHERE email = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(verifyQuery, [email, oldPassword], (error, results) => {
        if (error) {
          return reject(error);
        }
        if (results.length === 0) {
          return reject(new Error('旧密码不正确'));
        }
        this.connection.query(updateQuery, [newPassword, email], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
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

  async insertProduct(productName, imageUrl, currentPrice, platform, storeName, productUrl) {
    const query = 'INSERT INTO products (product_name, image_url, current_price, platform, store_name, product_url) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [productName, imageUrl, currentPrice, platform, storeName, productUrl], (error, results) => {
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