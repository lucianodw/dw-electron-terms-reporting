var express = require('express');
var router = express.Router();

var mongoose   = require('mongoose');
var _   = require('lodash');

var Legal = require('../models/legal.model');

var Handlebars     = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(Handlebars);


router.get('/', function(req, res) {
	// Legal.find({'atg_profile':'300980945'},function(err, results){
	// 	if (err) return next(err);
	//     res.render('index', {
	//       title: 'Terms Reporting',
	//       articles: results
	//     });
	// 	console.log('results', results);
	// 	// res.render('index', results);
	// });


	 // Set dates
          var today1 = new Date();
          var today2 = new Date();
          today1.setDate(today1.getDate() - 3);
          today2.setDate(today2.getDate() - 9);

		  // today1.setDate(today1.getDate() - 10);
    //       today2.setDate(today2.getDate() - 16);


          var todayDate = today1.toISOString();
          var preDate = today2.toISOString();

          console.log('todayDate',todayDate.toLocaleString());
          console.log('preDate',preDate.toLocaleString());


	Legal.find({
		// "created_at":{
  //             $gte: preDate,
  //             $lte: todayDate
  //       },
		// 'atg_profile':'300980945'
	},function(err, results){
		if (err) return next(err);
		console.log('length', results.length);

		var uniques = _.uniqBy(results, function (e) {
  			return e.atg_profile;
		});
		console.log('uniques', uniques.length);

		var dateFilter = _.filter(uniques, function(user) {
  			return user.created_at < today1 && user.created_at > today2;
		});


		var optInLP = _.filter(dateFilter, function(obj) {
        return obj.section == 'Landing_Page';
    });

    var optInMyWineCellar = _.filter(dateFilter, function(obj) {
        return obj.section == 'My_Wine_Cellar';
    });

    var optInCheckout = _.filter(dateFilter, function(obj) {
        return obj.section == 'Main_Checkout';
    });

    // console.log('dateCheckout', dateCheckout);



    var totalOptIns = optInMyWineCellar.length + optInLP.length + optInCheckout.length;

	    res.render('index', {
	      title: 'Opt-in Terms & Conditions Reporting',
	      results: results,
	      totals: results.length,
	      dedupes: uniques.length,
	      dateFrom: preDate,
	      dateTo: todayDate,
	      countMWC: optInMyWineCellar.length,
	      countLP: optInLP.length,
	      countCheckout: optInCheckout.length,
	      dateFilter: dateFilter.length,
	      countTotal: totalOptIns,
	      helpers: {
            counter: function (index) {
            	return index + 1;
            }
        }
	    });
		// console.log('results', results);
		// res.render('index', results);
	});

});

module.exports = router;
