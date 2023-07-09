const db = require('../models/db');

// GET /books
exports.getAllBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results.rows);
  });
};

// GET /books/{id}
exports.getBookById = (req, res) => {
  const bookId = req.params.id;
  let query = 'SELECT * FROM books WHERE id = ' + bookId
  console.log(query)
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(results.rows[0]);
    }
  });
};

// POST /books
exports.createBook = (req, res) => {
  const { title, author, genre } = req.body;
  db.query(
    'INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING id',
    [title, author, genre],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ id: result.rows[0].id });
    }
  );
};

// PUT /books/{id}
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre } = req.body;
  db.query(
    'UPDATE books SET title = $1, author = $2, genre = $3 WHERE id = $4',
    [title, author, genre, bookId],
    (err) => {
      if (err) {
        throw err;
      }
      res.sendStatus(204);
    }
  );
};

// DELETE /books/{id}
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  db.query('DELETE FROM books WHERE id = $1', [bookId], (err) => {
    if (err) {
      throw err;
    }
    res.sendStatus(204);
  });
};
