var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var fbRef = new Firebase('https://acidotic.firebaseio.com/');

var defaultSeason = 'winter';

// HOME PAGE
router.get('/', function(req, res, next) {
  res.render('pages/seasons/winter', {
    title: 'Winter Events - acidotic Racing',
    season: 'winter'});
});


// SEASON PAGES
  router.get('/winter', function(req, res, next) {
    fbRef.child('events/winter/').on('value', function(snapshot) {
      var fbData = {};
      fbData.title = 'Winter Events - acidotic Racing';
      fbData.season = 'winter';
      fbData.data = snapshot.val();
      return res.render('pages/seasons/winter', fbData);
    });
  });

  router.get('/spring', function(req, res, next) {
    fbRef.child('events/spring/').on('value', function(snapshot) {
      var fbData = {};
      fbData.title = 'Spring Events - acidotic Racing';
      fbData.season = 'spring';
      fbData.data = snapshot.val();
      return res.render('pages/seasons/spring', fbData);
    });
  });

  router.get('/summer', function(req, res, next) {
    fbRef.child('events/summer/').on('value', function(snapshot) {
      var fbData = {};
      fbData.title = 'Summer Events - acidotic Racing';
      fbData.season = 'summer';
      fbData.data = snapshot.val();
      return res.render('pages/seasons/summer', fbData);
    });
  });

  router.get('/fall', function(req, res, next) {
    fbRef.child('events/fall/').on('value', function(snapshot) {
      var fbData = {};
      fbData.title = 'Fall Events - acidotic Racing';
      fbData.season = 'fall';
      fbData.data = snapshot.val();
      return res.render('pages/seasons/fall', fbData);
    });
  });

// ABOUT PAGE
  router.get('/about', function(req, res, next) {
    res.render('pages/about', {
      title: 'About - acidotic Racing',
      season: 'fall',
      page: 'about'});
  });

// CONTACT PAGE
  router.get('/contact', function(req, res, next) {
    res.render('pages/contact', {
      title: 'Contact - acidotic Racing',
      season: 'fall',
      page: 'contact'});
  });

// SINGLE EVENTS
  // WINTER EVENTS
  router.get('/sidehiller-snowshoe', function(req, res, next) {
    fbRef.child('events/winter/sidehiller-snowshoe').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/kingman-farm', function(req, res, next) {
    fbRef.child('events/winter/kingman-farm').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/snowshoe-hullabaloo', function(req, res, next) {
    fbRef.child('events/winter/snowshoe-hullabaloo').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/snowshoe-championship', function(req, res, next) {
    fbRef.child('events/winter/snowshoe-championship').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  // SPRING EVENTS
  router.get('/ralph-waldo', function(req, res, next) {
    fbRef.child('events/spring/ralph-waldo').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/exeter-trail', function(req, res, next) {
    fbRef.child('events/spring/exeter-trail').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  // SUMMER EVENTS

  router.get('/loon-mountain-race', function(req, res, next) {
    fbRef.child('events/summer/loon-mountain-race').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/kingman-farm-trail-race', function(req, res, next) {
    fbRef.child('events/summer/kingman-farm-trail-race').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/harmony-hill', function(req, res, next) {
    fbRef.child('events/summer/harmony-hill').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  // FALL EVENTS

  router.get('/bretton-woods', function(req, res, next) {
    fbRef.child('events/fall/bretton-woods').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/vulcans-fury', function(req, res, next) {
    fbRef.child('events/fall/vulcans-fury').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

  router.get('/roaring-falls', function(req, res, next) {
    fbRef.child('events/fall/roaring-falls').on('value', function(snapshot) {
      return res.render('pages/single-event', snapshot.val());
    });
  });

module.exports = router;
