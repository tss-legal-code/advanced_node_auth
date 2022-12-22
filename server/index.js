require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT } = process.env;
const start = async () => {
  try {
    // mongoose.set('strictQuery', false);
    // await mongoose.connect(
    //   process.env.DATABASE_URL,
    //   () => console.log('mongodb connected successfully'),
    //   (err) => console.log(err)
    // );
    app.listen(PORT, () => console.log(`server started at ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
start();