const Game = require('../game');
const Card = require('../card');
const Player = require('../player');

describe('game tests',() => {
  let batman;
  let superman;
  let captainMarvel;
  let nickFrost;
  let blackWidow;
  let wonderWoman;

  let ichi;
  let ni;

  let topTrumps;

  beforeEach(() => {
    batman = new Card('Batman', 10, 8, 9);
    superman = new Card('Superman', 10, 10, 10);
    captainMarvel = new Card('Captain Marvel', 8, 10, 10);
    nickFrost = new Card('Nick Frost', 8, 6, 5);
    blackWidow = new Card('Black Widow', 9, 4, 8);
    wonderWoman = new Card('Wonder Woman', 7, 10, 7);

    ichi = new Player('ichi');
    ni = new Player('ni');

    topTrumps = new Game([ichi, ni], [batman, superman, captainMarvel, nickFrost, blackWidow, wonderWoman]);

    topTrumps.dealCards();
  });

  test('game should have two players', () => {
    expect(topTrumps.players.length).toBe(2);
  });

  test('the game should have 6 cards', () => {
    expect(topTrumps.cards.length).toBe(6);
  })

  test('game should be able to deal cards', () => {
    topTrumps.dealCards();
    expect(ichi.deck.length).toBe(3);
    expect(ni.deck.length).toBe(3);
  });

  test('a player should be able to play the top card in their deck', () => {
    topTrumps.addToPlayed();
    expect(topTrumps.played.length).toBe(2);
  });

  test('a player should be able to select a category to play with', () => {
    topTrumps.selectCategory('strength');
    expect(topTrumps.criteria).toBe('strength');
  });

  test('expects determine winner function to work', () => {
    topTrumps.addToPlayed();
    topTrumps.selectCategory('strength');
    expect(topTrumps.determineWinner()).toBe('ni');
  });

  test('expects remove from hand function to work', () => {
    ichi.removeCardFromHand();
    expect(ichi.deck.length).toBe(2);
  })

  test('expects play round function to work', () => {
    expect(topTrumps.playRound('strength')).toBe('ni');
  });

  test('if the categories are tied, the result is that selecting player wins', () => {
    expect(topTrumps.playRound('intelligence')).toBe('ichi');
  });

  test('the winner should recieve both cards at the end of the round', () => {;
    topTrumps.allocateCards('strength');
    expect(ni.deck.length).toBe(4);
    expect(ichi.deck.length).toBe(2);
  });

  test('the winner choses the category', () => {
    topTrumps.playRound('strength');
    expect(topTrumps.players[0].name).toBe('ni');
  });

  test('expects check winner function to work', () => {
    let san = new Player('san');
    san.deck = [];
    topTrumps.players.shift();
    topTrumps.players.push(san);
    topTrumps.checkIfOverallWinner();
    expect(topTrumps.overallWinner).toBe('ni');
  })

  test('winner declared when one player has all the cards', () => {
    expect(topTrumps.playFullGame()).toBeTruthy();
  });
})
