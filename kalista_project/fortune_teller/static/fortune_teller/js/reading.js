$(document).ready(function(){

});

function welcomeAnimChange(message) {
  $('#start_message').fadeOut('slow')
  $('#start_message').promise().done(function(){
    $('#start_message').text(message)
    $('#start_message').fadeIn('slow')
});
}



(function() {

    var quotes = $(".quotes");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(2000)
            .fadeOut(2000, showNextQuote);
    }

    showNextQuote();

})()
