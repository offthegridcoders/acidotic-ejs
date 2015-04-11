var Express = require('Express');
var Router = Express.Router();
var Firebase = require('firebase');
var FireBaseRef = new Firebase('https://acidotic.firebaseio.com/');
var AllData = {};
var SessionAuth;

// INITIALLY loads all event data into global variable
  FireBaseRef.child('events/').on('value', function(snapshot) {
    AllData = snapshot.val();
  });

// ADMIN and LOGIN PAGE
  function getAdminPageData(eventData) {
    var fbData = {};
    fbData.title = 'Admin Dashboard - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = AllData;
    // starting event edit data (false or value)
    fbData.event = eventData;
    return fbData;
  };

  function goToAdminHome(res, startingData) {
    var data = getAdminPageData(startingData);
    return res.render('pages/admin/admin', data);
  };

  function errorReport(error) {
    if (error) {
      console.log("Data could not be saved." + error);
    } else {
      console.log("Data saved successfully.");
    }
  };

  // logout function (takes in res)
  function logout(res) {
    FireBaseRef.unauth();
    SessionAuth = null;
    // navigate to homepage
    var data = getHomePageData();
    return res.render('pages/seasons/winter', data);
  };

  Router.get('/login', function(req, res, next) {
    return res.render('pages/admin/login', getAdminPageData(false));
  });

  Router.post('/login', function(req,res) {
    // email    : "admin@acidoticracing.com",
    // password : "RACEacidotic2015!"
    FireBaseRef.authWithPassword({
      email    : req.body.email,
      password : req.body.password
    }, function(error, authData) {
      if (error) {
        // failed authenication
        console.log("Login Failed!", error);
      } else {
        // saves auth data in global var
        SessionAuth = authData;
        console.log("Authenticated successfully with payload:", authData);
        // goes to admin homepage
        goToAdminHome(res, false);
      }
    }, {
      // expires after browser shutdown
      remember: "sessionOnly"
    });
  });

  Router.get('/logout', function(req,res) {
    logout(res);
  });

  Router.post('/logout', function(req,res) {
    logout(res);
  });

  Router.get('/admin', function(req, res, next) {
    if (SessionAuth) {
      // if authenticated - go to admin homepage
      goToAdminHome(res, false);
    } else {
      // navigate to regular homepage
      return res.render('pages/seasons/winter', getHomePageData());
    }
  });

  Router.post('/admin', function(req, res){
    return res.render('pages/admin/admin', getAdminPageData(JSON.parse(req.body.eventChoice)));
  });

  Router.post('/update-event', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.key;
    var fbRef = FireBaseRef.child("events/" + season + '/' + curEvent);
    fbRef.update(req.body, function(error) {errorReport(error)});
    goToAdminHome(res, false);
  });


  Router.post('/update-details', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    fbRef.update(req.body, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/remove-detail', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    fbRef.remove();
    goToAdminHome(res, false);
  });

  Router.post('/new-detail', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    key = parseInt(key) + 1;
    var fbURL = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    var newData = {
      copy: req.body.copy,
      title: req.body.title,
      image: req.body.image,
    };

    fbRef.set(newData, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

// HOME PAGE
  function getHomePageData() {
    var fbData = {};
    fbData.title = 'Winter Events - acidotic Racing';
    fbData.season = 'winter';
    fbData.data = AllData;
    return fbData;
  };

  Router.get('/', function(req, res, next) {
    return res.render('pages/seasons/winter', getHomePageData());
  });

// SEASON PAGES
  function setSeasonData(title, season) {
    var fbData = {};
    fbData.title = title + ' - acidotic Racing';
    fbData.season = season;
    fbData.data = AllData;
    return fbData
  };

  // WINTER
  Router.get('/winter', function(req, res, next) {
    return res.render('pages/seasons/winter', setSeasonData('Winter Events', 'winter'));
  });

  // SPRING
  Router.get('/spring', function(req, res, next) {
    return res.render('pages/seasons/spring', setSeasonData('Spring Events', 'spring'));
  });

  // SUMMER
  Router.get('/summer', function(req, res, next) {
    return res.render('pages/seasons/summer', setSeasonData('Summer Events', 'summer'));
  });

  // FALL
  Router.get('/fall', function(req, res, next) {
    return res.render('pages/seasons/fall', setSeasonData('Fall Events', 'fall'));
  });


// REGULAR PAGES
  function setRegPageData(title, season, page) {
    var fbData = {};
    fbData.title = title + ' - acidotic Racing';
    fbData.season = season;
    fbData.page = page;
    fbData.data = AllData;
    return fbData
  };
  // ABOUT PAGE
  Router.get('/about', function(req, res, next) {
    return res.render('pages/about', setRegPageData('About', 'fall', 'about'));
  });

  // CONTACT PAGE
  Router.get('/contact', function(req, res, next) {
    return res.render('pages/contact', setRegPageData('Contact', 'fall', 'contact'));
  });


// SINGLE EVENTS
  function setSingleEventData(title, season, data, eventName) {
    var fbData = {};
    fbData.title = title + ' - acidotic Racing';
    fbData.season = season;
    fbData.data = data;
    fbData.event = eventName;
    return fbData;
  };

  // SIDEHILLER SNOWSHOE
  Router.get('/sidehiller-snowshoe', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.sidehillerSnowshoe.title,
      'winter', AllData, AllData.winter.sidehillerSnowshoe);
    return res.render('pages/single-event', data);
  });

  // KINGMAN FARM
  Router.get('/kingman-farm', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.kingmanFarm.title,
      'winter', AllData, AllData.winter.kingmanFarm);
    return res.render('pages/single-event', data);
  });

  // SNOWSHOE HULLABALOO
  Router.get('/snowshoe-hullabaloo', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.snowshoeHullabaloo.title,
      'winter', AllData, AllData.winter.snowshoeHullabaloo);
    return res.render('pages/single-event', data);
  });

  // SNOWSHOE CHAMPIONSHIP
  Router.get('/snowshoe-championship', function(req, res, next) {
    var data = setSingleEventData(AllData.winter.snowshoeChampionship.title,
      'winter', AllData, AllData.winter.snowshoeChampionship);
    return res.render('pages/single-event', data);
  });

  // RALPH WALDO
  Router.get('/ralph-waldo', function(req, res, next) {
    var data = setSingleEventData(AllData.spring.ralphWaldo.title,
      'spring', AllData, AllData.spring.ralphWaldo);
    return res.render('pages/single-event', data);
  });

  // EXETER TRAIL RACE
  Router.get('/exeter-trail', function(req, res, next) {
    var data = setSingleEventData(AllData.spring.exeterTrail.title,
      'spring', AllData, AllData.spring.exeterTrail);
    return res.render('pages/single-event', data);
  });

  // LOON MOUNTAIN RACE
  Router.get('/loon-mountain-race', function(req, res, next) {
    var data = setSingleEventData(AllData.summer.loonMountainRace.title,
      'summer', AllData, AllData.summer.loonMountainRace);
    return res.render('pages/single-event', data);
  });

  // KINGMAN FARM TRAIL RACE
  Router.get('/kingman-farm-trail-race', function(req, res, next) {
    var data = setSingleEventData(AllData.summer.kingmanFarmTrailRace.title,
      'summer', AllData, AllData.summer.kingmanFarmTrailRace);
    return res.render('pages/single-event', data);
  });

  // HARMONY HILL SUMMER XC SERIES
  Router.get('/harmony-hill', function(req, res, next) {
    var data = setSingleEventData(AllData.summer.harmonyHill.title,
      'summer', AllData, AllData.summer.harmonyHill);
    return res.render('pages/single-event', data);
  });

  // BRETTON WOODS FELL RACE
  Router.get('/bretton-woods', function(req, res, next) {
    var data = setSingleEventData(AllData.fall.brettonWoods.title,
      'fall', AllData, AllData.fall.brettonWoods);
    return res.render('pages/single-event', data);
  });

  // VULCANS FURY
  Router.get('/vulcans-fury', function(req, res, next) {
    var data = setSingleEventData(AllData.fall.vulcansFury.title,
      'fall', AllData, AllData.fall.vulcansFury);
    return res.render('pages/single-event', data);
  });

  // ROARING FALLS
  Router.get('/roaring-falls', function(req, res, next) {
    var data = setSingleEventData(AllData.fall.roaringFalls.title,
      'fall', AllData, AllData.fall.roaringFalls);
    return res.render('pages/single-event', data);
  });

module.exports = Router;
