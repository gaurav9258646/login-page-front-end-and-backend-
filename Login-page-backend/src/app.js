const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/user.routes');

app.use('/users', userRoutes);

module.exports = app;
