/*jslint browser: true*/
/*global console, Hammer, $*/

/**
 * Tindercards.js
 *
 * @author www.timo-ernst.net
 * @module Tindercardsjs
 * License: MIT
 */
var Tindercardsjs = Tindercardsjs || {};

Tindercardsjs = (function () {
  'use strict';

  var exports = {};

  /**
   * Represents one card
   *
   * @memberof module:Tindercardsjs
   * @class
   */
  exports.card = function (cardid, name, desc, imgpath) {

    var jqo;

    /**
     * Returns a jQuery representation of this card
     *
     * @method
     * @public
     * @return {object} A jQuery representation of this card
     */
    this.tojQuery = function () {
      if (!jqo) {
        jqo = $('<div class="tc-card">').attr('data-cardid', cardid).html('<div class="tc-card-img-cont"><img src="' + imgpath + '" class="tc-card-img"><div class="tc-card-body"><h2 class="tc-card-name">' + name + '</h2><span class="tc-card-desc">' + desc + '</span></div></div>');
      }
      return jqo;
    };

  };

  /**
   * Initializes swipe
   *
   * @private
   * @function
   */
  function initSwipe(onSwiped) {
    var $topcard = $('.tc-card'),
      deltaX = 0;

    $topcard.each(function () {

      var $card = $(this);

      (new Hammer(this)).on("panleft panright panend panup pandown", function (ev) {
        var transform,
          yfactor = ev.deltaX >= 0 ? -1 : 1,
          resultEvent = {};

        if (ev.type === 'panend') {
          if (deltaX > 100 || deltaX < -100) {
            transform = 'translate3d(' + (5 * deltaX) + 'px, ' + (yfactor * 1.5 * deltaX) + 'px, 0)';
            $card.css({
              'transition': '-webkit-transform 0.5s',
              '-webkit-transform': transform + ' rotate(' + ((-5 * deltaX) / 10) + 'deg)'
            });
            setTimeout(function () {
              $card.css({
                'display': 'none'
              });
              if (typeof onSwiped === 'function') {
                resultEvent.cardid = $card.attr('data-cardid');
                resultEvent.card = $card;
                if (deltaX > 100) {
                  resultEvent.direction = 'right';
                } else {
                  resultEvent.direction = 'left';
                }
                onSwiped(resultEvent);
              } else {
                console.warn('onSwipe callback does not exist!');
              }
            }, 500);
          } else {
            transform = 'translate3d(0px, 0, 0)';
            $card.css({
              'transition': '-webkit-transform 0.3s',
              '-webkit-transform': transform + ' rotate(0deg)'
            });
            setTimeout(function () {
              $card.css({
                'transition': '-webkit-transform 0s'
              });
            }, 300);
          }
        } else if (ev.type === 'panup' || ev.type === 'pandown') {
          // No vertical scroll
          ev.preventDefault();
        } else {
          deltaX = ev.deltaX;

          transform = 'translate3d(' + deltaX + 'px, ' + (yfactor * 0.15 * deltaX) + 'px, 0)';

          $card.css({
            '-webkit-transform': transform + ' rotate(' + ((-1 * deltaX) / 10) + 'deg)'
          });
        }


      });
    });
  }

  /**
   * Renders the given cards
   *
   * @param {array} cards The cards (must be instanceof Tindercardsjs.card)
   * @param {jQuery} $target The container in which the cards should be rendered into
   * @param {function} onSwiped Callback when a card was swiped
   * @example Tindercardsjs.render(cards, $('#main'));
   * @method
   * @public
   * @memberof module:Tindercardsjs
   */
  exports.render = function (cards, $target, onSwiped) {
    var i,
      $card;

    if (cards) {
      for (i = 0; i < cards.length; i = i + 1) {
        $card = cards[i].tojQuery().appendTo($target).css({
          'position': 'absolute',
          'border': '1px solid #666',
          'border-radius': '10px',
          'background-color': '#fff',
          'height': '430px',
          'left': '10px',
          'top': '10px',
          'right': '10px'
        });

        $card.find('.tc-card-img').css({
          'width': '100%',
          'border-radius': '10px 10px 0 0'
        });

        $card.find('.tc-card-name').css({
          'margin-top': '0',
          'margin-bottom': '5px'
        });

        $card.find('.tc-card-body').css({
          'position': 'relative',
          'left': '10px',
          'width': '280px'
        });

      }

      initSwipe(onSwiped);

    } else {
      console.warn('tindercards array empty, no cards will be displayed');
    }
  };

  return exports;

}());

//Categories
var categories = {'childhood':0,
                  'freedom':0,
                  'love':0
}
var result = {'childhood':["You prefer living in the now and enjoy where you are at this place and time. However we can always learn a lot from our childhood in terms of nurturing your future kid of even yourself. Reconnect with a childhood friend over lunch – you might surprise yourself. ", "You have vague memories of your childhood. You look to the past to make you happy but also happy with where you are today. You enjoy catching up with old pals once a while. Don’t let your past life influence your present happiness.", "You love looking through old photos on the daily, reminiscing a better time then. You might not be as in touch with your childhood friends and have a yearning for them (text them, it doesn’t hurt). Try to live and enjoy the now, recreate those memories you cherish, in a present day context.  "],
                  'freedom':["One off occasions doesn’t stick to you. You prefer routines and planned outings, and do not enjoying ‘winging’ it. You often see a better way of spending your time and money. Give yourself a surprise and take a spontaneous trip together with someone. ", "You enjoy doing something different once in awhile. You often catch yourself overthinking a situation and turn it down – you’re somewhat a realist as much as you are a dreamer. The best cure for over-thinking is to be here right now. Do not worry at things that are not present, you cannot determine the future. ", "You’re a thrill seeker. You enjoy special occasions as it allows you a break from your daily routines. You’re the friend that people can count on to always be there for some fun. You do not believe in second chances and live in the now. Remember, some actions have consequences. It would be helpful to think twice before saying yes!"],
                  'love':["Your independence is remarkable and you know that you don’t have to change anything about yourself to fit some dating mold. You don’t need anyone to help you, however consider letting people in to help you every once in awhile. Don’t forget to always live for you. ", "You’re looking for love but you’re unsure. We can’t blame you Love is a curious thing and most people are looking for it. When you are not looking for someone to love, that is when people tend to appear. Focus on your own life growth. It makes you a better person and also makes you a better potential life partner. That is something that exudes from one’s personality and gives off that attractive confidence.", "You’re extremely loving. You enjoy spending quality time with your loved ones and often go out of the way to make them feel special. Love brings up everything unlike itself for the purpose of healing. There might be bumps along the road but keep in mind the things and moment that made you happy. Don’t forget to set aside time not just for love though!"]
}
$(document).ready(function () {
  $('#result').hide();
  $('#myBar').hide()
  // Define cards
  var cards = [
    new Tindercardsjs.card(5, '', '', 'static/fortune_teller/media/tarrot/love2.png'),
    new Tindercardsjs.card(4, '', '', 'static/fortune_teller/media/tarrot/freedom2.png'),
    new Tindercardsjs.card(3, '', '', 'static/fortune_teller/media/tarrot/childhood2.png'),
    new Tindercardsjs.card(2, '', '', 'static/fortune_teller/media/tarrot/love1.png'),
    new Tindercardsjs.card(1, '', '', 'static/fortune_teller/media/tarrot/freedom1.png'),
    new Tindercardsjs.card(0, '', '', 'static/fortune_teller/media/tarrot/childhood1.png')
  ];

  // Categories

  // Render cards
  Tindercardsjs.render(cards, $('#reading'), function (event) {
    console.log('Swiped ' + event.direction + ', cardid is ' + event.cardid + ' and target is:');
    console.log(event.card);
    if(event.direction=='right'){
      if(event.cardid==0 || event.cardid==3){
        categories['childhood'] += 1;
      } else if (event.cardid==1 || event.cardid==4) {
        categories['freedom'] += 1;
      } else {
        categories['love'] += 1;
      }
    }
    if (event.cardid==5) {
      $('#childhood').append("<p>" + result['childhood'][categories['childhood']] + "</p>")
      $('#freedom').append("<p>" + result['freedom'][categories['freedom']]+ "</p>")
      $('#love').append("<p>" + result['love'][categories['love']]+ "</p>")
      $('#myBar').show()
      move();
    }
  });
});

function scrollToAbout () {
  // window.scroll({ top: 1366, left: 0, behavior: 'smooth' });
  zenscroll.toY(1366)
}
function scrollToHome () {
  // window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  zenscroll.toY(0)
}
function scrollToReading () {
  // window.scroll({ top: 2732, left: 0, behavior: 'smooth' });
  zenscroll.toY(2732)
}

function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            $('#myBar').hide();
            $('#myProgress').hide();
            clearInterval(id);
            $('#result').show();
            zenscroll.toY(4098);
        } else {
            width+=0.5;
            elem.style.width = width + '%';
        }
    }
}
