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
    try {
        const result = await TodoModel.find({ status: 'active' }).select({ _id: 0 }).limit(2);
        res.status(200).json({
            result,
            message: 'Success!',
        });
        console.log(result);
    } catch (err) {
        res.status(500).json({
            message: 'Not Success!',
        });
    }
});

/**
 * Get A todo by todo id
 */
route.get('/:id', async (req, res) => {
    try {
        const result = TodoModel.find({ _id: req.params.id });
        res.status(200).json({
            result,
            messae: 'Success',
        });
    } catch (err) {
        if (err instanceof mongoose.Error) {
            res.status(500).json({
                error: 'Something is wrong with your request',
            });
        } else {
            res.status(500).json({
                error: 'server side error!',
            });
        }
    }
});

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
route.post('/all', async (req, res) => {
    try {
        await TodoModel.insertMany(req.body);
        res.status(200).json({ message: 'Data is inserted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Server side error!' });
    }
});
/**
 * Update todo by todo id
 * Note : Don't use callback function with async await.
 *
 */
route.put('/:id', async (req, res) => {
    try {
        const result = await TodoModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { status: 'active' } },
            { new: true },
        );
        res.status(200).json({
            message: 'Data is updated successfully!',
        });
        console.log(result);
    } catch (err) {
        res.status(500).json({
            message: 'Server side error!',
        });
    }
});
/**
 * Delete a todo
 */
route.delete('/:id', async (req, res) => {
    try {
        await TodoModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'succesfully deleted!',
        });
    } catch (error) {
        res.status(500).json({
            error: 'Not Deleted',
        });
    }
});

module.exports = route;
