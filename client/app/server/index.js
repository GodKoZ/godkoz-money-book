const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = 80;

// todo update csp
// app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../build')));

app.use('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
