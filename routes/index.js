var Express = require('express');
var Router = Express.Router();
var Firebase = require('firebase');
var FireBaseRef = new Firebase('https://acidotic.firebaseio.com/');
var AllData = {};
var Defaults = {};
var Sponsors;

// Page META Data information

  var meta = {
    homepage: {
      title: 'Events - acidotic Racing',
      description: 'Our mission is to host uncompromisingly excellent events in beautiful locations on challenging courses and to make every competitor feel as though they are important and valuable to us.'
    },
    winter: {
      title: 'Winter Events',
      description: 'When our favorite trails get covered in a blanket of snow we see opportunities where others might see obstacles. Spend a winter racing with us and it just might become your favorite thirteen weeks of the year.'
    },
    spring: {
      title: 'Spring Events',
      description: 'As the snow recedes and our favorite trails emerge we get the fever just like you. Our two spring trail races will test your winter fitness while satisfying your need to get out in the woods.'
    },
    summer: {
      title: 'Summer Events',
      description: 'This is our busiest and most diverse season of the year. No matter what your passion, if it involves breathtaking challenges look no further.'
    },
    fall: {
      title: 'Fall Events',
      description: 'Come with us to some of the most spectacular places New Hampshire has to offer. Youll earn every glimpse of foliage at these amazing locations.'
    },
    about: {
      title: 'About Page',
      description: 'As a race director and an athlete, I understand that no detail is too small. Our organization strives to host professional race services in a diverse multitude of endurance pursuits.'
    },
    contact: {
      title: 'Contact',
      description: 'Please feel free to contact us at with any questions you may have at contact@acidoticRACING.com or fill out the form below. We will be sure to respond in a timely manner. Thank you for contacting us!'
    },
    community: {
      title: 'Community',
      description: 'acidotic Racing is a community of like minded multi-sport endurance athletes. We pride ourselves on being approachable and supportive of all persons, skills, and abilities.'
    },
    charity: {
      title: 'Charity',
      description: 'aR has made a commitment to support the charitable organizations that are dearest to our hearts. This is done through a variety of charitable giving outlets associated with our professional event services.'
    },
    kingmanFarm: {
      title: 'Kingman Farm Moonlight Snowshoe Race - Winter Event',
      description: 'This is a NIGHT race! Working headlamps are mandatory. No headlamp...no race. The gently rolling approximately 5 km course will be illuminated by your headlamp. The trails at UNH’s Kingman Farm are the perfect site for a snowshoe race.'
    },
    fatBike: {
      title: 'Fat Moose Fat Bike Race - Winter Event',
      description: ''
    },
    frostyCrank: {
	      title: 'Frosty Crank Fat Bike Race - Winter Event',
	      description: ''
    },
    snowshoeHullabaloo: {
      title: 'Exeter Snowshoe Hullabaloo - Winter Event',
      description: 'The Snowshoe Hullabaloo is run over almost 4 miles of tight and twisted, packed single track in the Henderson-Swazey (aka Ft. Rock) Woods in Exeter, NH. The course is a pulse-raising roller coaster of ups, downs and hair-pin turns.'
    },
    snowshoeChampionship: {
      title: 'NH Snowshoe Championship - Winter Event',
      description: 'Snowshoe racing is a uniquely regional sport and in our opinion there is NO region with a more vibrant and competitive scene than the northeast! Thats why the Northeast Snowshoe Federation was formed.'
    },
    ralphWaldo: {
      title: 'Ralph Waldo Emerson Trail Race - Spring Event',
      description: 'The race will take place on the City of Concords Winant Park Trails. Located close to downtown Concord the trails offer a beautiful taste of windy singletrack, switchbacks with breathtaking views of the capital area and nordic-type paths. The approximately 10 mile long course will be more of the same!'
    },
    exeterTrail: {
      title: 'Exeter Trail Race - Spring Event',
      description: 'All competitors will start at the same time in the same location. At a predetermined spot the 10 mile & 4.6 mile races will split with competitors going in different directions. This a very technical trail race.'
    },
    loonMountainRace: {
      title: 'Loon Mountain Race - Summer Event',
      description: 'Over the years our Loon Mountain Race has developed quite a following here in the northeast. The reputation as one of the region’s toughest races is due in large part to the kilometer ascent of North Peak.'
    },
    kingmanFarmTrailRace: {
      title: 'Kingman Farm Trail Race - Summer Event',
      description: 'Were getting back to our roots a little (pun intended) with one of the newest editions to our renowned event schedule. The Kingman Farm Trail Race will be an old-school show up, lace up, and race sort of event'
    },
    harmonyHill: {
      title: 'Harmony Hill Summer XC Series - Summer Event',
      description: 'Returning for a 3rd Year, The Harmony Hill Cross Country (XC) Series is a fun summer XC running series for all abilities and ages. In the past two years this has become a favorite race for first time runners as well as seasoned athletes'
    },
    brettonWoods: {
      title: 'Bretton Woods Fell Race - Fall Event',
      description: 'In an effort to accommodate more competitors we are offering two different courses this year. The short course will race the first three check points (CPs); A, B, & C. The total distance will be approximately TBA miles.'
    },
    vulcansFury: {
      title: 'Vulcans Fury Trail Race - Fall Event',
      description: 'Your friends at aR have designed one of the most technical and scenic courses possible in a location that was once brimming with fire...yes...Pawtuck was once a volcanic site.'
    }
  };
// INITIALLY loads data into global variable
  FireBaseRef.child('defaultseason/').on('value', function(snapshot) {
    Defaults.season = snapshot.val();
  });

  FireBaseRef.child('events/').on('value', function(snapshot) {
    AllData = snapshot.val();
  });

  FireBaseRef.child('sponsors/').on('value', function(snapshot) {
    Sponsors = snapshot.val();
  });
// LOGIN/LOGOUT
  function getAdminPageData(eventData) {
    var fbData = {};
    fbData.season = Defaults.season;
    fbData.data = AllData;
    fbData.page = 'Admin';
    fbData.title = 'Admin Dashboard';
    // starting event edit data (false or value)
    fbData.event = eventData;
    fbData.sponsors = Sponsors;
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

  function logout(res) {
    FireBaseRef.unauth();
    res.clearCookie('authenticated');
    // navigate to homepage
    var data = getHomePageData();
    return res.redirect('/');
  };

  Router.get('/logout', function(req,res) {
    logout(res);
  });

  Router.get('/login', function(req, res, next) {
    var fbData = {};
    fbData.season = Defaults.season;
    if (req.cookies.authenticated) {
      return res.redirect('/admin');

    } else {
      return res.render('pages/admin/login', fbData);
    }
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
        return res.status('401').render('pages/admin/login', getAdminPageData(false));
      } else {
        // saves auth data in global var
        var minute = 60 * 1000;
        res.cookie('authenticated', authData, { maxAge: minute });
        console.log("Authenticated successfully with payload:");
        // goes to admin homepage
        res.redirect('/admin');
      }
    }, {
      // expires after browser shutdown
      remember: "sessionOnly"
    });
  });
// ADMIN
  Router.get('/admin', function(req, res, next) {
    if (req.cookies.authenticated) {
      // if authenticated - go to admin homepage
      goToAdminHome(res, false);
    } else {
      // navigate to regular homepage
      return res.status(401).redirect('/login');
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

  Router.post('/add-map', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/coursemaps/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    var newData = {
      image: req.body.image,
      thumb: req.body.thumb,
    };

    fbRef.set(newData, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/remove-map', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var fbURL = "events/" + season + '/' + curEvent + '/coursemaps/' + key;
    var fbRef = FireBaseRef.child(fbURL);
    fbRef.remove();
    goToAdminHome(res, false);
  });

  Router.post('/move-blurb-down-form', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var key2 = parseInt(key) + 1;

    var firstVal, secondVal;

    var fbURLFirst = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURLFirst);
    fbRef.once('value', function(snapshot) {
      firstVal  = snapshot.val();
    });

    var fbURLSecond = "events/" + season + '/' + curEvent + '/details/' + key2;
    var fbRef2 = FireBaseRef.child(fbURLSecond);
    fbRef2.once('value', function(snapshot) {
      secondVal  = snapshot.val();
    });

    fbRef.update(secondVal, function(error) {
      errorReport(error)
    });

    fbRef2.update(firstVal, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/move-blurb-up-form', function(req, res){
    var season = req.body.season;
    var curEvent = req.body.eventKey;
    var key = req.body.key;
    var key2 = parseInt(key) - 1;

    var firstVal, secondVal;

    var fbURLFirst = "events/" + season + '/' + curEvent + '/details/' + key;
    var fbRef = FireBaseRef.child(fbURLFirst);
    fbRef.once('value', function(snapshot) {
      firstVal  = snapshot.val();
    });

    var fbURLSecond = "events/" + season + '/' + curEvent + '/details/' + key2;
    var fbRef2 = FireBaseRef.child(fbURLSecond);
    fbRef2.once('value', function(snapshot) {
      secondVal  = snapshot.val();
    });

    fbRef.update(secondVal, function(error) {
      errorReport(error)
    });

    fbRef2.update(firstVal, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/update-sponsor', function(req, res){
    var key = req.body.key;
    var fbURL = "sponsors/" + key;
    var fbRef = FireBaseRef.child(fbURL);
    var newData = {
      image: req.body.image,
      link: req.body.link,
    };

    fbRef.update(newData, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });

  Router.post('/remove-sponsor', function(req, res){
    var key = req.body.key;
    var fbURL = "sponsors/" + key;
    var fbRef = FireBaseRef.child(fbURL);

    fbRef.remove();
    goToAdminHome(res, false);
  });

  Router.post('/update-default-season', function(req, res){
    var fbURL = "/";
    var fbRef = FireBaseRef.child(fbURL);
    var data = {defaultseason: req.body.defaultSeason};
    fbRef.update(data, function(error) {
      errorReport(error)
    });

    goToAdminHome(res, false);
  });
// HOME PAGE
  function getHomePageData() {
    var fbData = {};
    fbData.title = meta.homepage.title;
    fbData.description = meta.homepage.description;
    fbData.url = '/';
    fbData.event = null;
    fbData.season = Defaults.season;
    fbData.page = Defaults.season;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    return fbData;
  };

  Router.get('/', function(req, res, next) {
    return res.redirect('/' + Defaults.season);
  });
// SEASON PAGES
  function setSeasonData(season, title, description, url) {
    var fbData = {};
    fbData.title = title;
    fbData.description = description;
    fbData.url = url;
    fbData.event = null;
    fbData.season = season;
    fbData.page = season;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    return fbData
  };

  // WINTER
  Router.get('/winter', function(req, res, next) {
    return res.render('pages/seasons/winter',
      setSeasonData('winter', meta.winter.title, meta.winter.description, req._parsedOriginalUrl.href));
  });

  // SPRING
  Router.get('/spring', function(req, res, next) {
    return res.render('pages/seasons/spring',
      setSeasonData('spring', meta.spring.title, meta.spring.description, req._parsedOriginalUrl.href));
  });

  // SUMMER
  Router.get('/summer', function(req, res, next) {
    return res.render('pages/seasons/summer',
      setSeasonData('summer', meta.summer.title, meta.summer.description, req._parsedOriginalUrl.href));
  });

  // FALL
  Router.get('/fall', function(req, res, next) {
    return res.render('pages/seasons/fall',
      setSeasonData('fall', meta.fall.title, meta.fall.description, req._parsedOriginalUrl.href));
  });
// REGULAR PAGES
  function setRegPageData(season, page, title, description, url) {
    var fbData = {};
    fbData.title = title;
    fbData.description = description;
    fbData.url = url;
    fbData.event = null;
    fbData.season = season;
    fbData.page = page;
    fbData.data = AllData;
    fbData.sponsors = Sponsors;
    return fbData
  };

  // ABOUT PAGE
  Router.get('/about', function(req, res, next) {
    return res.render('pages/about', setRegPageData('fall', 'about', meta.about.title, meta.about.description, req._parsedOriginalUrl.href));
  });

  // CONTACT PAGE
  Router.get('/contact', function(req, res, next) {
    return res.render('pages/contact',
      setRegPageData('fall', 'contact', meta.contact.title, meta.contact.description, req._parsedOriginalUrl.href));
  });

  // COMMUNITY PAGE
  Router.get('/community', function(req, res, next) {
    return res.render('pages/community',
      setRegPageData('winter', 'community', meta.community.title, meta.community.description, req._parsedOriginalUrl.href));
  });

  // COMMUNITY PAGE
  Router.get('/charity', function(req, res, next) {
    return res.render('pages/charity',
      setRegPageData('fall', 'charity', meta.charity.title, meta.charity.description, req._parsedOriginalUrl.href));
  });
// SINGLE EVENTS
  function setSingleEventData(season, data, eventName, title,  description, url) {
    var fbData = {};
    fbData.title = title;
    fbData.description = description;
    fbData.url = url;
    fbData.season = season;
    fbData.page = season;
    fbData.data = data;
    fbData.event = eventName;
    fbData.sponsors = Sponsors;
    return fbData;
  };

  // KINGMAN FARM
  Router.get('/kingman-farm-moonlight-snowshoe-race', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.kingmanFarm,
      meta.kingmanFarm.title, meta.kingmanFarm.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // FAT MOOSE FAT BIKE RACE
  Router.get('/fatty-moose-fat-bike-race', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.fatBike,
      meta.fatBike.title, meta.fatBike.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // FROSTY CRANK FAT BIKE RACE
  Router.get('/fat-bike-frosty-crank', function(req, res, next) {
      var data = setSingleEventData('winter',
        AllData, AllData.winter.frostyCrank,
        meta.frostyCrank.title, meta.frostyCrank.description, req._parsedOriginalUrl.href);
      return res.render('pages/single-event', data);
  });

  // SNOWSHOE HULLABALOO
  Router.get('/exeter-snowshoe-hullabaloo', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.snowshoeHullabaloo,
      meta.snowshoeHullabaloo.title, meta.snowshoeHullabaloo.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // SNOWSHOE CHAMPIONSHIP
  Router.get('/nh-snowshoe-championship', function(req, res, next) {
    var data = setSingleEventData('winter',
      AllData, AllData.winter.snowshoeChampionship,
      meta.snowshoeChampionship.title, meta.snowshoeChampionship.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // RALPH WALDO
  Router.get('/ralph-waldo-emerson-trail-race', function(req, res, next) {
    var data = setSingleEventData('spring',
      AllData, AllData.spring.ralphWaldo,
      meta.ralphWaldo.title, meta.ralphWaldo.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // EXETER TRAIL RACE
  Router.get('/exeter-trail-race', function(req, res, next) {
    var data = setSingleEventData('spring',
      AllData, AllData.spring.exeterTrail,
      meta.exeterTrail.title, meta.exeterTrail.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // LOON MOUNTAIN RACE
  Router.get('/loon-mountain-race', function(req, res, next) {
    var data = setSingleEventData('summer',
      AllData, AllData.summer.loonMountainRace,
      meta.loonMountainRace.title, meta.loonMountainRace.description, req._parsedOriginalUrl.href);
    // return res.render('pages/loon-mountain-race', data);
    return res.render('pages/single-event', data);
  });

  // KINGMAN FARM TRAIL RACE
  Router.get('/kingman-farm-trail-race', function(req, res, next) {
    var data = setSingleEventData('summer',
      AllData, AllData.summer.kingmanFarmTrailRace,
      meta.kingmanFarmTrailRace.title, meta.kingmanFarmTrailRace.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // HARMONY HILL SUMMER XC SERIES
  Router.get('/harmony-hill-summer-xc-series', function(req, res, next) {
    var data = setSingleEventData('summer',
      AllData, AllData.summer.harmonyHill,
      meta.harmonyHill.title, meta.harmonyHill.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });


  // BRETTON WOODS FELL RACE
  Router.get('/bretton-woods-fell-race', function(req, res, next) {
    var data = setSingleEventData('fall',
      AllData, AllData.fall.brettonWoods,
      meta.brettonWoods.title, meta.brettonWoods.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

  // VULCANS FURY
  Router.get('/vulcans-fury-trail-race', function(req, res, next) {
    var data = setSingleEventData('fall',
      AllData, AllData.fall.vulcansFury,
      meta.vulcansFury.title, meta.vulcansFury.description, req._parsedOriginalUrl.href);
    return res.render('pages/single-event', data);
  });

// OLD ACIDOTIC LINKS
//Make sure the old links still work:
  Router.get('/results.php', function(req, res, next){
    res.redirect(410, 'http://www.acidoticracing.com/');
  });

  Router.get('/photos.php', function(req, res, next){
    res.redirect(410, 'http://www.acidoticracing.com/');
  });
// old url redirects

  Router.get('/kingman-farm', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/kingman-farm-trail-race');
  });

  Router.get('/sidehiller-showshoe', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/');
  });

  Router.get('/sidehiller-showshoe-race', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/');
  });

  Router.get('/snowshoe-hullabaloo', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/exeter-snowshoe-hullabaloo');
  });

  Router.get('/snowshoe-championship', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/nh-snowshoe-championship');
  });

  Router.get('/ralph-waldo', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/ralph-waldo-emerson-trail-race');
  });

  Router.get('/exeter-trail', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/exeter-trail-race');
  });

  Router.get('/harmony-hill', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/harmony-hill-summer-xc-series');
  });

  Router.get('/bretton-woods', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/bretton-woods-fell-race');
  });

  Router.get('/vulcans-fury', function(req, res, next){
    res.redirect(301, 'http://www.acidoticracing.com/vulcans-fury-trail-race');
  });


  Router.get('/events/view_event.php', function(req, res, next){
    switch(req.query.ID) {
    case '1':
        res.redirect(301, 'http://www.acidoticracing.com/kingman-farm-trail-race/');
        break;
    case '2':
        res.redirect(301, 'http://www.acidoticracing.com/');
        break;
    case '3':
        res.redirect(301, 'http://www.acidoticracing.com/exeter-snowshoe-hullabaloo/');
        break;
    case '4':
        res.redirect(301, 'http://www.acidoticracing.com/nh-snowshoe-championship/');
        break;
    case '6':
        res.redirect(301, 'http://www.acidoticracing.com/ralph-waldo-emerson-trail-race/');
        break;
    case '7':
        res.redirect(301, 'http://www.acidoticracing.com/exeter-trail-race/');
        break;
    case '8':
        res.redirect(301, 'http://www.acidoticracing.com/loon-mountain-race/');
        break;
    case '11':
        res.redirect(301, 'http://www.acidoticracing.com/harmony-hill-summer-xc-series/');
        break;
    case '13':
        res.redirect(301, 'http://www.acidoticracing.com/bretton-woods-fell-race/');
        break;
    case '14':
        res.redirect(301, 'http://www.acidoticracing.com/vulcans-fury-trail-race/');
        break;
    case '15':
        res.redirect(301, 'http://www.acidoticracing.com/roaring-falls-trail-race/');
        break;
    default:
        console.log('Didnt find old event page so defaulted to homepage');
        return res.status(404).redirect('http://www.acidoticracing.com/');
    }
  });
//The 404 Route (ALWAYS Keep this as the last route)
  Router.get('*', function(req, res, next){
    return res.status(404).redirect('/');
  });

module.exports = Router;
