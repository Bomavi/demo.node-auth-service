const mongoose = require('mongoose');
const { schema } = require('./schema');

// schema.pre('save', () => {
// 	return doStuff();
// });

module.exports = mongoose.model('Task', schema);
