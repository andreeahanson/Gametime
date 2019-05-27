import domUpdates from './domUpdates';
import User from './User';
import Game from './Game';
import Round from './Round';

class FinalRound extends Round {
  constructor(game, survey, user1, user2, secondSurvey) {
  super(game, survey, user1, user2)
  // this.game = game;
  // this.survey = survey;
  // this.answers = this.survey.answers.sort((a,b) => b.respondents-a.respondents)
  // this.users = [user1, user2];
  // this.currentPlayer = null;
  // this.guess = '';
  // this.turn = {};
    this.secondSurvey = secondSurvey;
    this.secondAnswers = this.secondSurvey.answers.sort((a,b) => b.respondents-a.respondents)
  }

  displayFinalRoundCurrentQuestion() {
    if (this.currentPlayer === this.users[0]){
      domUpdates.displayCurrentQuestion(this.survey.survey.question);
    } else {
      domUpdates.displayCurrentQuestion(this.secondSurvey.survey.question);
    }
  }

  evaluateFinalRoundGuess(guess) {
    let threeAnswers;
    console.log("SURVEY", this.survey)
    console.log("SECOND survey", this.secondSurvey)
    console.log("ANSWERS", this.answers)
    if (this.currentPlayer === this.users[0]){
      threeAnswers = this.answers;
    } else {
      threeAnswers = this.secondAnswers;
    }
    let threeWords = threeAnswers.map(el => el.answer.toUpperCase())
    if (threeAnswers.map(el => el.answer.toUpperCase()).includes(guess.toUpperCase())){
      let scoreUpdate= threeAnswers.find(el => {
        if(el.answer.toUpperCase() === guess.toUpperCase()) {
          console.log(el)
          return el
        
        }
      })
      this.currentPlayer.updateFinalRoundScore(scoreUpdate.respondents);
      domUpdates.displayEachAnswer(scoreUpdate);
      let indexOfGuess = threeWords.indexOf(guess.toUpperCase());
      this.eliminateGuessedAnswer(indexOfGuess);
    } 
  }
  // gameTimer()
  
  changeFinalRoundTurn() {
    domUpdates.displayEachFinalRoundAnswer();
    domUpdates.displayFinalRoundScore();

    // domUpdates.
    this.changeTurn(this.users[0]);
    domUpdates.setAnswers(this.secondSurvey);
  }

  displayFinalRoundCurrentQuestion() {
    domUpdates.displayFinalRoundCurrentQuestion(this.survey.survey.question);
  }


}





export default FinalRound;