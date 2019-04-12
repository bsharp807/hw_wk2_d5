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
    console.log(topTrumps.players[0].deck);
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
    ichi.playTopCard();
    console.log(topTrumps.played);
    expect(topTrumps.played.length).toBe(1);
  });

  test('a player should be able to select a category to play with', () => {
    topTrumps.selectCategory('Strength'); // needs to reverse players after each turn
    expect(topTrumps.critetia).toBe('Strength');
  });

  test('the game should be able to determine round winner', () => {
    expect(topTrumps.playRound('Strength')).toBe('ni');
  });

  test('if the categories are tied, the result is a draw', () => {
    expect(topTrumps.playRound('Intelligence')).toBe('ichi');
  });

  test('the winner should recieve both cards at the end of the round', () => {;
    topTrumps.allocateCards('Strength');
    expect(ni.cards.length).toBe(4);
    expect(ichi.cards.length).toBe(2);
  });

  test('the winner choses the category', () => {
    topTrumps.playRound('Strength');
    expect(topTrumps.players[0].name).toBe('ni');
  });

  test('winner declared when one player has all the cards', () => {
    expect(topTrumps.playFullGame()).toBe('ni');
  });
})
