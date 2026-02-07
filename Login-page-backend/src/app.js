const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/user.routes');

app.use('/users', userRoutes);

module.exports = app;
