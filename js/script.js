/*
 * File script.js
 * Created by AlekseyMalyshev
 * Date created Oct 29, 2015
 */

(function app() {

  var documentReady = function () {
    $('input.start').on('click', start);
    $('div#tw-1').on('click', clickTower1);
    $('div#tw-2').on('click', clickTower2);
    $('div#tw-3').on('click', clickTower3);

    $('div#tw-1').on('click', '.ring', clickTw1Ring);
    $('div#tw-2').on('click', '.ring', clickTw2Ring);
    $('div#tw-3').on('click', '.ring', clickTw3Ring);

    start();
  };

  $(documentReady);
})();

var tower1 = [];
var tower2 = [];
var tower3 = [];

var $selRing = undefined;
var $selTower = undefined;
var height = 100;
var inter = undefined;

function start() {
  if (inter !== undefined) {
    clearInterval(inter);
    inter = undefined;
  }
  $('div#tw-1>div.ring').remove();
  $('div#tw-2>div.ring').remove();
  $('div#tw-3>div.ring').remove();

  tower1 = [];
  tower2 = [];
  tower3 = [];
  height = parseInt($('input.height').val());

  for (var i = 0; i < height; ++i) {
    var width = 90 - i * 7;
    var $div = $('<div>');
    $div.addClass('ring');
    var id = 'ring' + width;
    $div.attr('id', id);
    tower1.push(id);
    $div.css('width', width + '%');
    $('div#tw-1').prepend($div);
  }
}

function clickTower1(event) {
  clickTower(event, tower1);
}

function clickTower2(event) {
  clickTower(event, tower2);
}

function clickTower3(event) {
  clickTower(event, tower3);
  if (height === tower3.length) {
    win();
  }
}

function clickTw1Ring(event) {
  clickTwRing(event, tower1);
}

function clickTw2Ring(event) {
  clickTwRing(event, tower2);
}

function clickTw3Ring(event) {
  clickTwRing(event, tower3);
}

function clickTower(event, tower) {
  if ($selRing !== undefined && (tower.length === 0 ||
      $selRing.attr('id') < tower[tower.length - 1])) {
    $selRing.detach();
    $selRing.prependTo($(event.target));
    $selRing.removeClass('selected');
    tower.push($selRing.attr('id'));
    $selTower.pop();
    $selRing = undefined;
    $selTower = undefined;
  }
  else {
    flash($selRing);
  }
}

function clickTwRing(event, tower) {
  if (inter !== undefined) {
    return;
  }

  event.stopPropagation();
  $ring = $(event.target);
  if ($ring.hasClass('selected')) {
    $ring.removeClass('selected');
    $selRing = undefined;
    $selTower = undefined;
  }
  else if ($ring.attr('id') === tower[tower.length - 1]) {
    if ($selRing !== undefined) {
      $selRing.removeClass('selected');
    }
    $ring.addClass('selected');
    $selRing = $ring;
    $selTower = tower;
  }
  else {
    flash($ring);
  }
}

function win() {
  $stack = $('div#tw-3>div.ring');
  var index = 0;
  inter = setInterval(function(){
    var i = index % $stack.length;
    $($stack[i]).removeClass('green');
    i = ++index % $stack.length;
    $($stack[i]).addClass('green');
  }, 100);
}

function flash($div) {
  if ($div === undefined) {
    return;
  }

  $div.addClass('flash');
  var flash = 0;
  var inter = setInterval(function(){
    if (++flash % 2 === 0) {
      $div.addClass('flash');
    }
    else {
      $div.removeClass('flash');
      if (flash > 3) {
        clearInterval(inter);
      }
    }
  }, 50);
}
