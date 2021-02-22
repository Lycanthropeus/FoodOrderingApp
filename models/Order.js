var mongoose = require('mongoose');
var schema = mongoose.Schema;

/*
var OrderSchema = new schema({
    
    OrderedBy : {
        type: String
    },
    
    FoodOrder : {
        type: Array,
        items: String,
        "maxItems" : 4
    },
});
*/

var OrderSchema = new schema({
    "bsonType" : "array",
    "items" : "string"
});

module.exports = mongoose.model('something',OrderSchema);