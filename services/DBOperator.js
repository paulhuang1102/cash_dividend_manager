const { Client, Pool } = require("pg");

class DBOperator {
  constructor({
    username,
    password,
    host,
    database,
    port,
    connectionString,
    ssl = false,
    types,
    queryTimeout,
    applicationName,
    connectionTimeout,
    transactionSessionTimeout,
    max
  }) {
    this.pool = new Pool({
      user: username,
      password,
      host,
      database,
      port,
      connectionString,
      ssl,
      types,
      query_timeout: queryTimeout,
      application_name: applicationName,
      connectionTimeoutMillis: connectionTimeout,
      idle_in_transaction_session_timeout: transactionSessionTimeout,
      max
    });
  }

  async connect() {
    try {
      const client = await this.pool.connect();
      console.log("connected");
      return client;
    } catch (err) {
      console.error("connection error", err.stack);
    }
  }

  async query(sql, payload = []) {
    const client = await this.connect();

    try {
      const res = await client.query(sql, payload);
      return res;
    } catch (err) {
      console.log(err.stack);
      return null;
    } finally {
      client.release();
    }
  }
}

module.exports = DBOperator;
