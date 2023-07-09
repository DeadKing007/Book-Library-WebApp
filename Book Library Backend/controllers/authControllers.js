const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

const saltRounds = 10;
const secretKey = 'secret_key';

// Register a user
exports.register = (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      throw err;
    }

    // Save the user in the database
    db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hash],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
};

// Login and create a JWT token
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  db.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
    (err, results) => {
      if (err) {
        throw err;
      }

      // Check if user exists
      if (results.rows.length === 0) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        // Compare passwords
        bcrypt.compare(password, results.rows[0].password, (err, match) => {
          if (err) {
            throw err;
          }

          if (match) {
            // Generate JWT token
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

            res.json({ token });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        });
      }
    }
  );
};
