const Bot = require("./Bot");

class UserBot extends Bot {
  db;
  constructor(db, tag) {
    super("User");
    this.db = db;
  }

  async init() {
    await this.createTable();
    super.init();
  }

  async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE,
        passwordhash VARCHAR(50),
        token VARCHAR
      )
    `;
    const res = await this.db.query(query);
  }

  async createUser(email, passwordhash) {
    const query = `
      INSERT INTO users (email, passwordhash, token)
      VALUES($1, $2, $3)
    `;
    const res = await this.db.query(query, [email, passwordhash, token]);

    console.log(res);
  }

  async updateUserToken(id, token) {
    const query = `
      UPDATE users SET token=$1 WHERE id=$2
    `;

    const res = await this.db.query(query, [token, id]);
  }

  async deleteUser(id) {
    const query = `
      DELETE FROM users WHERE id=$1
    `;

    const res = await this.db.query(query, [id]);
  }
}

module.exports = UserBot;
