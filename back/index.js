require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  optionsSuccessStatus: 204,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});

app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      
    });
    

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порте ${PORT}`);
    });
  } catch(e) {
    console.log(e)
  }
}

start()