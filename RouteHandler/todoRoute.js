/**
 * Dependencies
 */
const express = require('express');
const mongoose = require('mongoose');

const route = express.Router();
const todoSchema = require('../schemas/todoSchema');

const TodoModel = mongoose.model('ToDo', todoSchema);
/**
 * Get all todos
 */
route.get('/', async (req, res) => {
    res.send('Ok');
});

/**
 * Get A todo by todo id
 */
route.get('/', async (req, res) => {});

/**
 * Post todo
 */
route.post('/', async (req, res) => {
    const newTodo = new TodoModel(req.body);
    await newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: 'There was a server side error!',
            });
        } else {
            res.status(200).json({
                message: 'Todo was inserted succesfully',
            });
        }
    });
});

/**
 * post multiple todo
 */
route.post('/all', async (req, res) => {});
/**
 * Update todo by todo id
 */
route.put('/:id', async (req, res) => {});
/**
 * Delete a todo
 */
route.delete('/:id', async (req, res) => {});

module.exports = route;
