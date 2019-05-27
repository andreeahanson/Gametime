// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import fetch from 'cross-fetch';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/normalize.scss'
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import data from '../data/surveys';

import User from './User';
import Game from './Game';
import domUpdates from './domUpdates';
import Round from './Round';
import FinalRound from './FinalRound';
let game;
let user1;
let user2;

var feudData;

fetch('https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data')
    .then(function(response){
        return response.json()
    })
    .then(function(parsedData){
        feudData = parsedData;
    })
    .catch(err => console.error('Error'));


$(document).ready(function() {

$('body').prepend('<section class="landing-page"><h1 class="landing-title">Welcome to Family Feud!  Let\'s Start the Game!</h1><input class="name-one" placeholder="Player One Name"><input class="name-two" placeholder="Player Two Name"><button class="start-button" type="button" id="star-five"><img src="https://fontmeme.com/permalink/190526/3844168efd44c37ec2867285667d7ac4.png" alt="barbie-font" border="0"></a></button></section>')

$('body').prepend('<section class="final-round-page hidden"><h1>Welcome To The Fa$t Money Round!</h1><div class="final-main"><section class="player-area player-one"><h3 class="player-one-name"><span class="name-player-one">NAME ONE</span></h3><div class="player-one-score">0</div><figure class="player-one-x">X</figure></section><figure class="survey"><h3 class="round-display">FAST MONEY ROUND <span class="round-num"> </span></h3><h2 class="survey-question"><span class="question"></span></h2><div class="survey-board"><h3 class="answer"><span class="answer-1 hidden"></span></h3><h3 class="respondents"><span class="respondents-1 hidden"></span></h3><h3 class="answer"><span class="answer-2 hidden"></span></h3><h3 class="respondents"><span class="respondents-2 hidden"></span></h3><h3 class="answer"><span class="answer-3 hidden"></span></h3><h3 class="respondents"><span class="respondents-3 hidden"></span></h3></div><form class="final-player-guess"><label class="final-guess-input-label" for="final-guess-input">Please enter your guess...</label><input type="text" id="final-guess-input" class="final-guess-input"><button type="button" class="submit-final-guess">SUBMIT GUESS</button></form></figure><section class="player-area player-two"><h3 class="player-two-name"><span class="name-player-two">NAME TWO</span></h3><div class="player-two-score">0</div><figure class="player-two-x">X</figure></section></div>')


$('.start-button').on('click', function(){
    user1 = new User($('.name-one').val(), "playerOne");
    user2 = new User($('.name-two').val(), "playerTwo");
    game = new Game(data, user1, user2);
    game.start();
    $('.landing-page').slideToggle('slow');
    domUpdates.displayNames(user1.name, user2.name);
})

$('.player-guess').on('submit', function(e){
    e.preventDefault();
    console.log(game.round)
    game.round.returnUserGuess($('#user-guess-input').val())
    $('.guess-input').val('')
});


$('.submit-guess').on('click', function(e){
  e.preventDefault();
  game.round.returnUserGuess($('#user-guess-input').val())
  $('.guess-input').val('')
  
});




})



{/* <div class="survey-board"><h3 class="answer"><span class="answer-1 hidden"></span></h3><h3 class="respondents"><span class="respondents-1 hidden"></span></h3><h3 class="answer"><span class="answer-2 hidden"></span></h3><h3 class="respondents"><span class="respondents-2 hidden"></span></h3><h3 class="answer"><span class="answer-3 hidden"></span></h3><h3 class="respondents"><span class="respondents-3 hidden"></span></h3></div><form class="player-guess"><label class="guess-input-label" for="guess-input">Please enter your guess...</label><input type="text" id="user-guess-input" class="guess-input"><button type="button" class="submit-final-guess">SUBMIT GUESS</button></form></figure><section class="player-area player-two"><h3 class="player-two-name"><span class="name-player-two">NAME TWO</span></h3><div class="player-two-score">0</div><figure class="player-two-x">X</figure></section> */}

