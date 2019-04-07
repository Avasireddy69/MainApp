var mongoose = require('mongoose');

var Hotel = mongoose.model('Hotel');

 

var _addReview = (req,res,doc)=>

{

    doc.reviews.push(req.body.reviews);

    doc.save((err,updatedreview)=>

    {

        if(err)

        {

            res.status(500).json(err);

        }

        else{

            res.status(201).json(updatedreview);

        }

    });

};

var _removeReview = (req,res,doc)=>

{

    var reviewid = req.params.reviewid;

    var review = doc.reviews;

    review.pop(reviewid);

    doc.save((err,updatedreview)=>

    {

        if(err)

        {

            res.status(500).json(err);

        }

        else{

            res.status(201).json(updatedreview);

        }

    });

};

 

module.exports.reviewsGetAll = (req,res)=>

{

    var hotelid = req.params.hotelid;

    Hotel.findById(hotelid).exec((err,doc)=>

    {

        console.log(typeof(doc.reviews));

        res.status(200).json(doc.reviews);

    })   

};

 

module.exports.reviewsGetOne = (req,res)=>

{

    var hotelid = req.params.hotelid;

    var reviewid = req.params.reviewid;

Hotel.findById(hotelid).select('reviews').exec((err, hotel)=>

{

    //var reviews = hotel.reviews.id(reviewid);

    res.json(hotel.reviews[reviewid]);

 

})

};

 

module.exports.reviewsAddOne = (req,res)=>

{

    var hotelid = req.params.hotelid;

    var reviewid = req.params.reviewid;

    Hotel.findById(hotelid).select('reviews').exec((err, hotel)=>

    {

        var response =

        {

            status:200,

            message:hotel

        };

        if(err)

        {

            console.log("Error finding the hotel");

            response.status= 500;

            response.message =err;

        }

        else if(!hotel)

        {

            console.log("Hotel id not found in database");

            response.status= 202;

            response.message= {

                "message":"Hotel Id not found"

            };

        }

        else if(hotel)

        {

            _addReview(req,res,hotel);

        }

        else{

            res.status(response.status).json(response.message);

        }

        

    });

};

 

module.exports.reviewsRemoveOne = (req,res)=>

{

    var hotelid = req.params.hotelid;

   

    Hotel.findById(hotelid).select('reviews').exec((err, hotel)=>

    {

        var response =

        {

            status:200,

            message:hotel

        };

        if(err)

        {

            console.log("Error finding the hotel");

            response.status= 500;

            response.message =err;

        }

        else if(!hotel)

        {

            console.log("Hotel id not found in database");

            response.status= 202;

            response.message= {

                "message":"Hotel Id not found"

            };

        }

        else if(hotel)

        {

            _removeReview(req,res,hotel);

            //console.log(doit);

        }

 

    });

  

};