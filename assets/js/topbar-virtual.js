$(function() {
  var $grid = $('.gridder').isotope({
    itemSelector: '.grid-item',
    percentPosition: true
  });
  
  // filter items on button click
  $('.filterable-button').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
  
  $('.testi-carousel').owlCarousel({
    margin: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    items: 1,
  });
  
  // Nice select
  $('.vg-select').niceSelect();
  
  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();
  
  // Page animation initialize
  new WOW().init();
  
  // Back to top
  var backTop = $(".btn-back_to_top");
  
  $(window).scroll(function() {
    if($(document).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    }
    else if($(document).scrollTop() < 400) {
      backTop.css('visibility', 'hidden');
    }
  });
  
  backTop.click(function() {
    $('html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
  
  $.fn.toggleSelected = function(options) {
    var defaults = $.extend({
      classes: 'selected',
      itemSelector: this.children(),
    });
    
    return this.each(function() {
      var o = defaults;
      var sel = o.itemSelector;
      
      sel.click(function() {
        var self = $(this);
        self.addClass(o.classes);
        self.siblings().removeClass(o.classes);
      });
    });
  };
  
  $('[data-toggle="selected"]').toggleSelected();
});

$(document).ready(function () {
  
  /* Sticky nvigation */
  
  var sticky = {
    $sticky: $('.sticky'),
    offsets: [],
    targets: [],
    stickyTop: null,
    
    set: function () {
      var self = this;
      
      var windowTop = Math.floor($(window).scrollTop());
      
      self.offsets = [];
      self.targets = [];
      
      // Get current top position of sticky element
      self.stickyTop = self.$sticky.data('offset') ? self.$sticky.css('position', 'absolute').data('offset') : self.$sticky.css('position', 'absolute').offset().top;
      
      // Cache all targets and their top positions
      self.$sticky.find('a').map(function () {
        var $el = $(this),
        href = $el.data('target') || $el.attr('href'),
        $href = /^#./.test(href) && $(href);
        
        return $href && $href.length && $href.is(':visible') ? [[$href[0].getBoundingClientRect().top + windowTop, href]] : null;
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0]);
        self.targets.push(this[1]);
      });
    },
    
    update: function () {
      var self = this;
      
      var windowTop = Math.floor($(window).scrollTop());
      var $stickyLinks = self.$sticky.find('.navbar-nav .nav-item').removeClass('active');
      var stickyPosition = 'fixed';
      var currentIndex = 0;
      
      // Toggle fixed position depending on visibility
      if ($(window).width() < 800 || $(window).height() < 500 || self.stickyTop > windowTop) {
        stickyPosition = 'absolute';
        self.$sticky.removeClass('floating');
        
      } else {
        
        for (var i = self.offsets.length; i--;) {
          if (windowTop >= self.offsets[i] - 2 && (self.offsets[i + 1] === undefined || windowTop <= self.offsets[i + 1] + 2)) {
            currentIndex = i;
            
            break;
          }
        }
        
      }
      
      self.$sticky.css({ 'position': stickyPosition});
      
      if(stickyPosition == 'absolute') {
        self.$sticky.removeClass('floating');
      }
      else {
        self.$sticky.addClass('floating');
      }
      
      $stickyLinks.eq(currentIndex).addClass('active');
    },
    
    init: function () {
      var self = this;
      
      $(window).on('resize', function () {
        self.set();
        
        self.update();
      });
      
      $(window).on('scroll', function () {
        self.update();
      });
      
      $(window).trigger('resize');
    }
  }
  
  if($('.navbar').hasClass('sticky')) {
    sticky.init();
  }
  
});

$(document).ready(function() {
  $('#sideel').click(function() {
    $(this).parents('.config').toggleClass('active');
  });
  
  $('body').data('bodyClassList', '');
  
  $('.color-item').click(function() {
    var cls = $(this).data('class');
    
    $('body').attr('class', $('body').data('bodyClassList'));
    $('body').addClass(cls);
  });
  
  $('#change-page').on('change', function() {
    var url = $(this).val() + '.html';
    
    if($(this).val()) {
      window.location.assign(url);
    }
  });
  
  $('[data-animate="scrolling"]').each(function() {
    var self = $(this);
    var target = $(this).data('target') ? $(this).data('target') : $(this).attr('href');
    
    self.click(function(e) {
      $('body, html').animate({ scrollTop: $(target).offset().top }, 1000);
      return false;
    });
  });
});


/*
 *  Counter
 *
 *  Require(" jquery.animateNumber.min.js ", " jquery.waypoints.min.js ")
 */
$(document).ready(function() {
  var counterInit = function() {
    if ( $('.section-counter').length > 0 ) {
      $('.section-counter').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
          $('.number').each(function(){
            var $this = $(this),
              num = $this.data('number');
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step
              }, 5000
            );
          });
          
        }

      } , { offset: '95%' } );
    }

  }
  counterInit();
});
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
  // explore btn
const exploreBtn = document.getElementById('explore-btn');
const firstSection = document.getElementById('about');

exploreBtn.addEventListener('click', () => {
  firstSection.scrollIntoView({
    behavior: 'smooth'
  });

});

function downloadCV() {
  var link = document.createElement("a");;
  link.setAttribute("href", "../assets/cv/Grigor-Nikolov-CV-En.pdf");
  link.setAttribute("download", "Grigor-Nikolov-CV-En.pdf");
  document.body.appendChild(link);
  link.click();
}
var my_button = document.getElementById("SeeAll")

function clickButtonOnLoad(my_button) {
  window.addEventListener("load", function() {
    document.getElementById(my_button).click();
  });
}

clickButtonOnLoad("SeeAll");

 // Select the form element -for the email
 var form = document.querySelector('.vg-contact-form');

 // Add a submit event listener to the form
 form.addEventListener('submit', function(event) {
   // Prevent the form from submitting normally
   event.preventDefault();

   // Send the form data using AJAX
   var xhr = new XMLHttpRequest();
   xhr.open('POST', form.action);
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.onload = function() {
     if (xhr.status === 200) {
       // Display a success message
       alert('Thank you for your message!');
     } else {
       // Display an error message
       alert('There was a problem sending your message.');
     }
   };
   xhr.send(new FormData(form));
 });;

window.addEventListener('load', () => {
  var loadingProgress = document.getElementById("loading-progress");
  var loaderContainer = document.querySelector(".load-container");
  var startTime = performance.timing.navigationStart;
  var endTime = performance.timing.loadEventEnd;

  function updateProgress() {
    var currentTime = performance.now();
    var progress = ((currentTime - startTime) / (endTime - startTime)) * 100;

    // Update the content of the loading-progress element
    loadingProgress.textContent = progress.toFixed(2) + "%";

    // Display the loading progress in console
    console.log("Loading Progress: " + progress.toFixed(2) + "%");

    if (currentTime < endTime) {
      requestAnimationFrame(updateProgress);
    } else {
      // Add a delay of 2 seconds before hiding the loaderContainer
      setTimeout(function() {
        loaderContainer.classList.add('loader-container-hidden');
      }, 2000);
    }
  }

  // Start the progress update animation
  requestAnimationFrame(updateProgress);
});

var portfolioSection = document.getElementById("portfolio");
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      portfolioSection.style.backgroundColor = "#202334"; // New background color
    } else {
      portfolioSection.style.backgroundColor = "#fb8cb1"; // Initial background color
    }
  });
});

observer.observe(portfolioSection);

window.addEventListener("scroll", function() {
  var scrollPosition = window.pageYOffset;
  var firstTextContainer = document.querySelector(".text-container:nth-child(1)");
  var secondTextContainer = document.querySelector(".text-container:nth-child(2)");
  var mobText = document.querySelector('#mb-moving-text');


  firstTextContainer.style.transform = "translateY(" + scrollPosition * 0.4 + "px)";
  secondTextContainer.style.transform = "translateY(" + scrollPosition * 0.3 + "px)";
  mobText.style.transform = "translateY(" + scrollPosition * 0.4 + "px)";

});

let script = document.currentScript

window.addEventListener("DOMContentLoaded",() => {
    let iDiv = document.createElement('div');
    iDiv.id = 'cursor';
    if(script.getAttribute("difference") == "disable"){
        iDiv.className = 'mscursor-cursor';
    } else {
        iDiv.className = 'mscursor-cursor mscursor-difference';
    }
    document.getElementsByTagName('body')[0].appendChild(iDiv);

    let pauseAnimation = script.getAttribute("pause-animation");
  
    let innerDiv = document.createElement('div');

    if(script.getAttribute("color") !== null){
        iDiv.style.backgroundColor = script.getAttribute("color");
    } else {
        if(script.getAttribute("difference") == "disable"){
            iDiv.style.backgroundColor = "black"
        } else {
            iDiv.style.backgroundColor = "white"
        }
    }

        if(pauseAnimation !== null && pauseAnimation == "disable"){
            if(script.getAttribute("circle-outline") == "disable"){
                innerDiv.className = 'mscursor-circle';
            } else {
                innerDiv.className = 'mscursor-circle new';
            }
        } else{
            if(script.getAttribute("circle-outline") == "disable"){
                innerDiv.className = 'mscursor-circle mscursor-border-transform';
            } else {
                innerDiv.className = 'mscursor-circle new mscursor-border-transform';
            }
        }

        
  
    iDiv.appendChild(innerDiv); 

    let size = Number(script.getAttribute("size")) || 30
  
    for(let i = 0; i < size; i++){
      let innerDiv = document.createElement('div');
      if(pauseAnimation !== null && pauseAnimation == "disable"){
        innerDiv.className = 'mscursor-circle';
    } else {
        innerDiv.className = 'mscursor-circle mscursor-border-transform';
    }
    
    if(script.getAttribute("color") !== null){
        innerDiv.style.backgroundColor = script.getAttribute("color");
    } else {
        if(script.getAttribute("difference") == "disable"){
            innerDiv.style.backgroundColor = "black"
        } else {
            innerDiv.style.backgroundColor = "white"
        }
    }
      iDiv.appendChild(innerDiv);
    }

  
  
  const coords = { x: 0, y: 0 };
  let timeout
  const circles = document.querySelectorAll(".mscursor-circle");
  
  const cursor = document.querySelector(".mscursor-cursor");
  
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    if(script.getAttribute("gradient") !== null){
        let colors = script.getAttribute("gradient").split(",")
        circle.style.backgroundColor = colors[Math.floor((index * colors.length)/ circles.length)];

        document.querySelector("div.new").border = `0.5px solid ${colors[0]}`
    }
  });
  
  const addclass = (e) => {
    if(script.getAttribute("pause-animation") !== "disable"){
      document.body.classList.remove("mscursor-nocursor")
      if(script.getAttribute("circle-outline") !== "disable"){
        document.querySelector("div.new").classList.remove("mscursor-scale-outline")
        document.querySelector("div.new").style.border=""
      }
      document.querySelectorAll("div.mscursor-circle").forEach(element => {
          element.classList.remove("mscursor-scale")
      })
    }
        coords.x = e.clientX;
        coords.y = e.clientY;
  };

  
  window.addEventListener("mousemove", (e) => addclass(e)) 
  window.addEventListener("touchmove", (e) => addclass(e.touches[0])) 
  
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
  
        cursor.style.top = x;
        cursor.style.left = y;
        
        circles.forEach(function (circle, index) {
          circle.style.left = x - 12 + "px";
          circle.style.top = y - 12 + "px";
  
          circle.style.scale = (circles.length - index) / circles.length;
  
          circle.x = x;
          circle.y = y;
  
          const nextCircle = circles[index + 1] || circles[0];
          x += (nextCircle.x - x) * 0.3;
          y += (nextCircle.y - y) * 0.3;
        });
  
        requestAnimationFrame(animateCircles);
      }
  
      animateCircles();

      if(script.getAttribute("cursor") == "disable"){
        document.body.classList.add("mscursor-nocursor")
      }
  
      if(script.getAttribute("pause-animation") !== "disable"){        
        const moove = () => {
            clearTimeout(timeout);
            timeout = setTimeout(
            () => {    
            document.body.classList.add("mscursor-nocursor")
            if(script.getAttribute("mscursor-circle-outline") !== "disable"){
                document.querySelector("div.new").classList.add("mscursor-scale-outline")

                if(script.getAttribute("color") !== null){
                    if(script.getAttribute("color-outline") !== null){
                        document.querySelector("div.new").style.border= `0.5px solid ${script.getAttribute("color-outline")}`;
                    } else {
                        document.querySelector("div.new").style.border= `0.5px solid ${script.getAttribute("color")}`;
                    }
                } else {
                    if(script.getAttribute("color-outline") !== null){
                        document.querySelector("div.new").style.border= `0.5px solid ${script.getAttribute("color-outline")}`;
                    } else {
                        if(script.getAttribute("difference") == "disable"){
                            document.querySelector("div.new").style.border= `0.5px solid black`
                        } else {
                            document.querySelector("div.new").style.border= `0.5px solid white`
                        }
                    }
                }
                
            }
            document.querySelectorAll("div.mscursor-circle").forEach(element => {
                element.classList.add("mscursor-scale")
            })
            }, 100)
        }
        

        document.onmousemove = moove;
        document.ontouchmove = moove;
      }
  })
  const element = document.querySelector('.projectIMG');

  element.addEventListener('mouseenter', () => {
    element.classList.add('remove-filter');
  });
  
  element.addEventListener('mouseleave', () => {
    element.classList.remove('remove-filter');
  });