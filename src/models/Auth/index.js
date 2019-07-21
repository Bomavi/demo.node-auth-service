/* npm imports: common */
const mongoose = require('mongoose');

/* local imports: common */
const { schema } = require('./schema');

// schema.pre('save', () => {
// 	return doStuff();
// });

module.exports = mongoose.model('Task', schema);
