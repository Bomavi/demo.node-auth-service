const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const searchOrGetAll = ({ Task }) => async (req, res, next) => {
	const { q = '' } = req.query;

	try {
		const tasks = await Task.find().search(q);
		res.status(200).send({ tasks });
	} catch (e) {
		next(e);
	}
};

const getById = ({ Task }) => async (req, res, next) => {
	const { _id } = req.params;

	try {
		const task = await Task.findById(_id);
		res.status(200).send({ task });
	} catch (e) {
		next(e);
	}
};

const create = ({ Task }) => async (req, res, next) => {
	try {
		const { description } = req.body;
		const task = await Task.create({
			_id: ObjectId(),
			description,
		});
		res.status(200).send({ task });
	} catch (e) {
		next(e);
	}
};

const updateById = ({ Task }) => async (req, res, next) => {
	const { _id } = req.params;

	try {
		const { description } = req.body;
		const task = await Task.findByIdAndUpdate(_id, { description });
		res.status(200).send({ task });
	} catch (e) {
		next(e);
	}
};

const deleteById = ({ Task }) => async (req, res, next) => {
	const { _id } = req.params;

	try {
		const task = await Task.findByIdAndDelete(_id);
		res.status(200).send({ task });
	} catch (e) {
		next(e);
	}
};

module.exports = models => {
	const router = express();

	router.post('/', create(models));
	router.get('/', searchOrGetAll(models));
	router.get('/:_id', getById(models));
	router.patch('/:_id', updateById(models));
	router.delete('/:_id', deleteById(models));

	return router;
};
