var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Event Schema
var termsSchema = new Schema({
	atg_profile: String,
	customer_opt_in: Boolean,
	brand: String,
	section: String,
	created_at: { type: Date, default: Date.now()},
	updated_at: { type: Date, default: Date.now()},
	imported_at: String
});


module.exports = mongoose.model('Legal', termsSchema);