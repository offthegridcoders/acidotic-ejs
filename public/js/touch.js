$(document).touchwipe({
  wipeLeft: function() {
    $('body').hide();
    slidePageForward()},
  wipeRight: function() {
    $('body').hide();
    slidePageBack()},
  min_move_x: 100,
  min_move_y: 100,
  preventDefaultEvents: false
});

function slidePageForward() {
  switch(window.location.pathname) {
    case '/winter':
      return window.location.assign('/charity')
    case '/spring':
      return window.location.assign('/charity')
    case '/summer':
      return window.location.assign('/charity')
    case '/fall':
      return window.location.assign('/charity')
    case '/community':
      return window.location.assign('/')
    case '/charity':
      return window.location.assign('/about')
    case '/about':
      return window.location.assign('/contact')
    case '/contact':
      return window.location.assign('/community')
    case '/sidehiller-snowshoe-race/':
      return window.location.assign('/kingman-farm-moonlight-snowshoe-race/')
    case '/kingman-farm-moonlight-snowshoe-race/':
      return window.location.assign('/exeter-snowshoe-hullabaloo/')
    case '/exeter-snowshoe-hullabaloo/':
      return window.location.assign('/nh-snowshoe-championship/')
    case '/nh-snowshoe-championship/':
      return window.location.assign('/ralph-waldo-emerson-trail-race/')
    case '/ralph-waldo-emerson-trail-race/':
      return window.location.assign('/exeter-trail-race/')
    case '/exeter-trail-race/':
      return window.location.assign('/loon-mountain-race/')
    case '/loon-mountain-race/':
      return window.location.assign('/kingman-farm-trail-race/')
    case '/kingman-farm-trail-race/':
      return window.location.assign('/harmony-hill-summer-xc-series/')
    case '/harmony-hill-summer-xc-series/':
      return window.location.assign('/bretton-woods-fell-race/')
    case '/bretton-woods-fell-race/':
      return window.location.assign('/vulcans-fury-trail-race/')
    case '/vulcans-fury-trail-race/':
    	return window.location.assign('/purity-springs/')
    case '/purity-springs/':
      return window.location.assign('/sidehiller-snowshoe-race/')
    default:
      return;
  }
}

function slidePageBack() {
  switch(window.location.pathname) {
    case '/winter':
      return window.location.assign('/community')
    case '/spring':
      return window.location.assign('/community')
    case '/summer':
      return window.location.assign('/community')
    case '/fall':
      return window.location.assign('/community')
    case '/community':
      return window.location.assign('/contact')
    case '/charity':
      return window.location.assign('/')
    case '/about':
      return window.location.assign('/charity')
    case '/contact':
      return window.location.assign('/about')
    case '/sidehiller-snowshoe-race/':
      return window.location.assign('/purity-springs/')
    case '/kingman-farm-moonlight-snowshoe-race/':
      return window.location.assign('/sidehiller-snowshoe-race/')
    case '/exeter-snowshoe-hullabaloo/':
      return window.location.assign('/kingman-farm-moonlight-snowshoe-race/')
    case '/nh-snowshoe-championship/':
      return window.location.assign('/exeter-snowshoe-hullabaloo/')
    case '/ralph-waldo-emerson-trail-race/':
      return window.location.assign('/nh-snowshoe-championship/')
    case '/exeter-trail-race/':
      return window.location.assign('/ralph-waldo-emerson-trail-race/')
    case '/loon-mountain-race/':
      return window.location.assign('/exeter-trail-race/')
    case '/kingman-farm-trail-race/':
      return window.location.assign('/loon-mountain-race/')
    case '/harmony-hill-summer-xc-series/':
      return window.location.assign('/kingman-farm-trail-race/')
    case '/bretton-woods-fell-race/':
      return window.location.assign('/harmony-hill-summer-xc-series/')
    case '/vulcans-fury-trail-race/':
      return window.location.assign('/bretton-woods-fell-race/')
    case '/purity-springs/':
      return window.location.assign('/vulcans-fury-trail-race/')

    default:
      return;
  }
}