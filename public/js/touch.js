$(document).touchwipe({
  wipeLeft: function() {slidePageForward()},
  wipeRight: function() {slidePageBack()},
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
    default:
      return;
  }
}