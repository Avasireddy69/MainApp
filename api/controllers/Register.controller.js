var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var db = require('../data/db');

 
var loginmodel = require('../data/login.model');



module.exports.userRegister = (req,res)=>
{
    var newUser =User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    
    });

    loginmodel.addUser(newUser, (err, user)=>
    {
        if(err)
        {
            res.json({success:false, msg:'failed to register user'});

        }
        else{
            res.json({success:true, msg:'user registered'});
        }
    });
    
    console.log('new user data: ',newUser);
   /*  User.create(
        newUser,
        (err, newUser)=>
        {
            if(err)

        {

            console.log('error posting user data: ',err);

            res.status(400).json(err);

        }

        else

        {

            res.status(202).json(newUser);

        }
        }
    ); */

};


module.exports.loginCheck = (req,res)=>
{
   const username = req.body.username;
   const password = req.body.password;
   console.log('register controller',username,password);
   loginmodel.getUserbyUsername(username, (err, user)=>
   {
       if(err) throw err;
       if(!user)
       {
           return res.json({success:false, msg:"user not found"});
       }
       loginmodel.comaparePassword(password, user.password, (err, isMatch)=>
       {
           
           if(err) throw err;
           if(isMatch)
           {
               const token = jwt.sign(user.toJSON(), db.secret, {
                   expiresIn: 604800
               });

               res.json({
                   success:true,
                   token:'JWT'+token,
                   user:
                   {
                       id: user._id,
                       username:user.username,
                       email:user.email

                   }
               });

           }
           else{
               return res.json({success:false, msg:'wrong password',pass:password});
           }
       });
   });


};