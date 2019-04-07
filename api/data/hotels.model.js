var mongoose = require('mongoose');

 

var hotelSchema = new mongoose.Schema({

    name:{

        type:String,

        required:true

    },

    location:{

        type:String,

        required:true

    },

    stars:{

        type:String,

        required:true

    },

    reviews:[String]

 

});



 

mongoose.model('Hotel',hotelSchema);