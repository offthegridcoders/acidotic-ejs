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


// Updates navbars 'selected' on correct page
  $('.nav-bars a[href="' + window.location.pathname + '"]').addClass('selected');
  if ((window.location.pathname == '/winter') ||
      (window.location.pathname == '/spring') ||
      (window.location.pathname == '/summer') ||
      (window.location.pathname == '/fall')) {
    $('.nav-bars a[href="/"]').addClass('selected');
  };

// hides swipe container
  var prevScrollPos;
  $('aside').hide();
  function toggleAside() {
    var curScrollPos = $(window).scrollTop();
    console.log('prev: ' + prevScrollPos + ' cur: ' + curScrollPos);
    if (prevScrollPos < curScrollPos) {
      $('aside').hide();
    } else {
      $('aside').show();
    }
    prevScrollPos = curScrollPos;
  }
