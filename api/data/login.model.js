var mongoose = require('mongoose');

 var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({

    username:{

        type:String,

        required:true

    },

    password:{

        type:String,

        required:true

    },

    email:{

        type:String,

        required:true

    },


 

});

 
const User = module.exports = mongoose.model('User',userSchema);

module.exports.getUserById = (id, callback)=>
{
    User.findById(id, callback);
};

module.exports.getUserbyUsername = (username, callback)=>
{
    const query = {username:username};
    User.findOne(query, callback);
};

module.exports.addUser = (newUser,callback)=>
{
    bcrypt.genSalt(10, (err, salt)=>
    {
        bcrypt.hash(newUser.password, salt ,(err, hash)=>
        {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comaparePassword = (cpassword, hash, callback)=>
{
    bcrypt.compare(cpassword,hash, (err, isMatch)=>{

        if(err) throw err;
        callback(null, isMatch);

    });    
};