/**
 * Dependencies
 */
const mongoose = require('mongoose');

/**
 * Schema of todo collection
 */
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

/**
 * Export module
 */

module.exports = todoSchema;
