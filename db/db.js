const mongoose = require('mongoose');

const DB = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);

const connect = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Database connections successfuly!');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connect };
