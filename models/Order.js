var mongoose = require('mongoose');
var schema = mongoose.Schema;


var OrderSchema = new schema({
    
    OrderedBy : {
        type: String
    },
    
    FoodOrder : {
        type: Array,
        items: String,
        "maxItems" : 4
    },

    CreatedAt : {
        type : Date,
        default : new Date
    },

    PaymentStatus : {
        type : Boolean,
        //default: false
    }
});


module.exports = mongoose.model('something',OrderSchema);