require('dotenv').config();
require('./db/db').connect();

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`This app running on the port : ${port}...`)
);

//Catching Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaugth Exceptions!');
  console.log(err);
  server.close(() => process.exit(1));
});

// Catching unhandled rejection promises
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection!');
  console.log(err);
  server.close(() => process.exit(1));
});
