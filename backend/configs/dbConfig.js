// db.js
const mongoose = require('mongoose');

let dbURL;
if (process.env.NODE_ENV === 'production') {
  dbURL = process.env.DB_URL;
} else {
  dbURL = process.env.DB_URL_DEV;
}


mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB URL:', dbURL);
});

module.exports = mongoose;
