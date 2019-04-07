var express = require('express');

var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controller.js');

var ctrlReviews = require('../controllers/reviews.controller.js');

var ctrlUsers = require('../controllers/Register.controller.js');

var passport = require('passport');
var jwt = require('jsonwebtoken');
 

router.route('/hotels').get(ctrlHotels.hotelsGetAll).post(ctrlHotels.hotelsAddOne);

router.route('/hotels/:hotelid').get(ctrlHotels.hotelsGetOne).delete(ctrlHotels.hotelsRemoveOne).put(ctrlHotels.hotelEdit);

router.route('/hotels/:hotelid/reviews/:reviewid').get(ctrlReviews.reviewsGetOne).delete(ctrlReviews.reviewsRemoveOne);

router.route('/hotels/:hotelid/reviews').get(ctrlReviews.reviewsGetAll).post(ctrlReviews.reviewsAddOne);

router.route('/user/register').post(ctrlUsers.userRegister);

router.route('/user/login').post(ctrlUsers.loginCheck);

module.exports = router;
