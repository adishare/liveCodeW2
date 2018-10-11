var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EventSchema = new Schema({
	'name' : String,
	'location' : String,
	'address' : String,
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	}
});

module.exports = mongoose.model('Event', EventSchema);
