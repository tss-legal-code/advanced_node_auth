require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/error-middleware');

const {
  PORT = 5000,
  MONGO_DB = "mongodb://localhost/advanced_node_auth",
  CLIENT_URL = 'localhost:3000'
} = process.env;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: CLIENT_URL,
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      MONGO_DB,
      () => console.log(`mongodb connected successfully to: ${MONGO_DB}`),
      (err) => console.log(err)
    );
    app.listen(PORT, () => console.log(`server started at ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
start();