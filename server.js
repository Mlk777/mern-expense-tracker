const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');

dotenv.config({ path: './config/config.env' });

const app = express();
connectDB();

app.use(express.json(), cors());
app.use('/api/v1/transactions', require('./routes/transactions'));

// Server static assets in production
if (process.env.NODE_ENV === 'PRODUCTION') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  )
);

process.on('SIGINT', () => {
  console.log('Bye bye!');
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('app terminated!');
  process.exit();
});
