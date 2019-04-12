class Game{
  constructor(players, cards){
    this.players = players;
    this.cards = cards;
    this.played = [];
    this.criteria;
    this.abilities = ['Intelligence','Strength','Agility'];
    this.overallWinner;
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

  addToPlayed(){
    this.played = [this.players[0].playTopCard(), this.players[1].playTopCard()]
  }

  setFirstPlayer(){
    // sets the first player variable as the first player in player array
    if(this.determineWinner() === this.players[0]){
      return;
    } this.players.reverse();
  };

  selectCategory(category){
    // sets the criteria variable to the category selected
    this.criteria = category;
  }

  determineWinner(){
    // returns player with higher number in criteria
    let total = 0
    let winningCard = ''
    const criteria = this.criteria

    for(let card of this.played){
      if(card[criteria] > total){
        total += card[criteria];
        winningCard = card.name;
      };
    };
    if(this.players[0].deck[0].name === winningCard){
        return this.players[0].name;
    } return this.players[1].name;
  }

  playRound(category){
    // play player one's top card
    // play player two's top card
    this.addToPlayed();
    // select category
    this.selectCategory(category);
    // determine winner
    let winner = this.determineWinner();
    // set first player
    this.setFirstPlayer();
    // both players remove card at array[0]
    this.players[0].removeCardFromHand();
    this.players[1].removeCardFromHand();
    // returns winner of round
    return winner;
  }

  allocateCards(category){
    // plays a round
    this.playRound(category);
    let winner = this.players[0];
    // moves played array to back of winners hand
    winner.deck = winner.deck.concat(this.played);
    // resets played array to []
    this.played = [];
  }

  checkIfOverallWinner(){
    let players = this.players;
    // checks if player hand matches original array length
    if(!this.overallWinner){
      if(players[0].deck.length === 0){
        this.overallWinner = players[1].name;
      } else if(players[1].deck.length === 0){
        this.overallWinner = players[0].name;
      } else return;
    }
  }

  playFullGame(){
    // loop until one player has 6 cards
    while(!this.overallWinner){
      this.checkIfOverallWinner();
      this.allocateCards('strength');
    }
  return this.overallWinner;
  }
}

module.exports = Game;
