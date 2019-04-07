

var mongoose = require('mongoose');

var Hotel = mongoose.model('Hotel');

 

module.exports.hotelsGetAll = (req,res)=>{

   

    var offset = 0;

    var count = 25;

    if(req.query && req.query.offset)

    {

        offset = parseInt(req.query.offset,10);

    }

    if(req.query && req.query.count){

        count = parseInt(req.query.count,10);

    }

    if(isNaN(offset) || isNaN(count))

    {

        res.status(400).json({

            "message":"Cannot give string as count"

        });

        return;

    }

Hotel.find().skip(offset).limit(count).exec((err, hotels)=>{

    if(err)

    {

        console.log('Error finding hotels');

        res.status(500).json(err);

    }

    else{

        console.log('Found hotels: ',hotels.length);

    res.json(hotels);

    }

   

});

};

 

module.exports.hotelsGetOne = (req,res)=>

{

    var hotelid = req.params.hotelid;

    Hotel.findById(hotelid).exec((err,data)=>

    {

        var response = {

            status : 200,

            message: data

        };

        if(err)

        {

            console.log("Error finding collection ",err);

            response.status = 500;

            response.message = err;

        }  

        else if(!data)

        {

            response.status = 404;

            response.message = {

                "message":"hotelid not found"

            };

        }    

        else

        {

            console.log(data);

            res.status(response.status).json(response.message);

        }

    });

};

 

var _splitArray = (input)=>

{

    var output;

    if(input && input.length > 0)

    {

        output = input.split(";");

    }

    else{

        output = [];

    }

    return output;

};

 

module.exports.hotelsAddOne = function(req,res)

{

    
    console.log("Data here in controller :",req.body.name,req.body.location,req.body.stars,req.body.reviews);



    Hotel.create(

      {   name:req.body.name,

        location:req.body.location,

        stars:req.body.stars,

        reviews:_splitArray(req.body.reviews)



     },(err,newhotel)=>{

       

        if(err)

        {

            console.log('error posting data: ',err);

            res.status(400).json(err);

        }

        else

        {

            res.status(202).json(newhotel);

        }

    });
 
 

};

 

module.exports.hotelsRemoveOne = (req,res)=>

{

    var hotelid = req.params.hotelid;

    Hotel.findByIdAndRemove(hotelid).exec((err, hotel)=>

    {

        if(err)

        {

            res.status(404).json(err);

        }

        else{

            console.log('Hotel deleted by id: ',hotelid);

            res.status(204).json();

        }

    });

};

module.exports.hotelEdit = (req,res)=>
{
    var hotelid = req.params.hotelid;
    Hotel.findByIdAndUpdate(hotelid,{$set:req.body}).exec((err, hotel)=>
    {
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Updated hotel with ID: ",hotelid);
            res.json();
        }
    });

};