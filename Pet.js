const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pet = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	type: {
    	type: String,
    	enum: ["dog", "cat", "rabbit", "bird", "horse", "crab"],
		required: true
	},

	breed: {
    	type: String,
    	required: true,
	},

	gender: {
		type: String,
		enum: ["female", "male"],
		required: true
	},
	
	age: {
  		type: Number,
  		min: 1
	},

	personality: {
		type: String,
		required: true
	},

	favoritefood: {
		type: String
	},

	other: {
		type: String
	},

	human: {
        type: mongoose.ObjectId,
        ref: 'Human',
        required: true
    },

	petpic: {
		type: String
	}
});

module.exports = mongoose.model("Pet", Pet);

