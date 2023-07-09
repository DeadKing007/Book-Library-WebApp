const express = require('express');
const router = express.Router();
const bookController = require('./controllers/bookControllers');
const authController = require('./controllers/authControllers');
const authMiddleware = require('./middleware/authMiddleware');

// Register a user
router.post('/register', authController.register);

// Login and create a JWT token
router.post('/login', authController.login);

// Apply authMiddleware to all book routes
router.use(authMiddleware.authMiddleware);

// GET /books
router.get('/', bookController.getAllBooks);

// GET /books/{id}
router.get('/:id', bookController.getBookById);

// POST /books
router.post('/', bookController.createBook);

// PUT /books/{id}
router.put('/:id', bookController.updateBook);

// DELETE /books/{id}
router.delete('/:id', bookController.deleteBook);

module.exports = router;
