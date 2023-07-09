const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'Shivam@123', //Update password
  host: 'localhost',
  port: 5432,
  database: 'bookstore', //Update name of DB if created with different name
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};