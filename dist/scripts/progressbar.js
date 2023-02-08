// SIGNATURE PROGRESS
function moveProgressBar() {

  $('.progress-bar').css({'left': 0});

var getPercent = ($('.progress-wrap').data('progress-percent') / 100); 
    var getProgressWrapWidth = $('.progress-wrap').width(); 
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 22000;
    
    // on page load, animate percentage bar to data percentage length
    // .stop() used to prevent animation queueing
    $('.progress-bar').stop().animate({
        left: progressTotal
    }, animationLength);
}