const express = require('express');
var cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', routes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
