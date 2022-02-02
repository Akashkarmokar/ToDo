/**
 * Dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
const todoRoute = require('./RouteHandler/todoRoute');
/**
 * Express app initialization
 */
const app = express();
app.use(express.json());
/**
 * Database connection with mongoose
 */
mongoose
    .connect('mongodb://localhost/todos')
    .then(() => {
        console.log('Connection with database succesfulll');
    })
    .catch((err) => {
        console.log(err);
    });
/**
 * ToDo Route
 */
app.use('/todo', todoRoute);

/**
 * Default Error Handler
 */
function errorHandler(err, req, res, next) {
    if (res.headerSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
/**
 * App server listening on port 300
 */
app.listen(3000, () => {
    console.log('App listening on port 3000');
});
