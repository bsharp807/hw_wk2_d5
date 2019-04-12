class Game{
  constructor(players, cards){
    this.players = players;
    this.cards = cards;
    this.played = [];
    this.criteria = '';
    this.abilities = ['Intelligence','Strength','Agility'];
  }

  rand(array){
    return Math.floor((Math.random() * Math.floor(array.length)));
  }

  dealCards(){
    // use two filters by index to give odds to player one and evens to player two
    let deckOne = this.cards.filter((card, index) => {
      return index % 2 === 0;
    });
    let deckTwo = this.cards.filter((card, index) => {
      return index % 2 != 0;
    });
    this.players[0].deck = deckOne;
    this.players[1].deck = deckTwo;
  }

  setFirstPlayer(){
    // sets the first player variable as the first player in player array
  }

  selectCategory(category){
    // sets the criteria variable to the category selected
  }

  determineWinner(){
    // returns player with higher number in criteria
  }

  playRound(category){
    // play player one's top card
    // play player two's top card
    // the player in array postion 0 is set as first
    // select category
    // determine round winner with category
    // set first player
    // both players remove card at array[0]
    // returns winner of round
  }

  allocateCards(category){
    // plays a round
    // moves played array to back of winners hand
    // resets played array to []
  }

  checkIfOverallWinner(){
    // checks if player hand matches original array length
  }

  playFullGame(){
    // loop until one player has 6 cards
    // play round - category determined randomly
    // allocate the cards to the winner
  }
}

module.exports = Game;
