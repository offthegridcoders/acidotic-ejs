new WOW().init();

$(window).scroll(function(e){
  parallax();
  setNavBar('nav');
  toggleAside();
});

window.onload = function(){
  window.scrollTo(0,0);
  setNavBar('nav');
};