class Player{
  constructor(name){
    this.name = name
    this.deck = [];
  }

  playTopCard(){
    // copies card at array[0] into game played
    return this.deck[0];
  }

  removeCardFromHand(){
    // drops card at array[0]
    this.deck.shift();
  }

  getCardsFromPlayed(){
    // picks up cards from played
  }


}

module.exports = Player;
