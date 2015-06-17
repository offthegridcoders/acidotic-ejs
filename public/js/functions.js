// Returns TRUE/FALSE
function headerIsOffScreen() {
  // -100px since header images fade out
  return $(window).scrollTop() > (parseInt($('header').css('height'), 10) - 300)
};

// Image Hover Changes in About Page
function changeBackgroundImage(id, img) {
  $('#' + id).css("background-image", img);
};

$(".thumb-pics").hover(function() {
  changeBackgroundImage('whyBlock', $(this).css("background-image"));
});
