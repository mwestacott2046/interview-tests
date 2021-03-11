
"use strict";

const SUITS = ['H','D','C','S'];
const FACEVALUES = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const BLACKJACK = 21;

const getCardScore =(val) => {

    let score;
    switch (val) {
        case 'A':
            score = 11;
            break;
        case 'K':
        case 'Q':
        case 'J':
            score = 10;
            break;
        default:
            score = Number(val);
    }
    return score;
}

class Card {
    
    constructor(displayVal, suit, score){
        this.cardCode = '' + displayVal + suit;
        this.displayValue = displayVal;
        this.suit = suit;
        this.score = score;
    }
}

class Hand {
    constructor(name, card1, card2){
        this.player = name;
        this.cards = [card1,card2];
    };

    getScore = () =>{
        let total =0;
        this.cards.forEach(card =>{
            total += card.score;
        });
        return total;
    };

    add =(card) => {
        this.cards.push(card);
    };
}

const buildDeck = () => {
    let deck = [];
    FACEVALUES.forEach(val => {
        SUITS.forEach(suit =>{
            deck.push(new Card(val,suit,getCardScore(val)));
        });
    });
    return deck;
}

// console.log('Card A should score 11: ',getCardScore('A'));
// console.log('Card K should score 10: ',getCardScore('K'));
// console.log('Card Q should score 10: ',getCardScore('Q'));
// console.log('Card J should score 10: ',getCardScore('J'));
// console.log('Non picture should score value: ',getCardScore('7'));



const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const shuffle =(deck) => {
    let shuffledDeck = [...deck];

    for (let i= shuffledDeck.length -1; i >0; i--){
        const j = getRandomInt(i+1);
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];    
    }

    return shuffledDeck;
};

class BlackjackGame {
    constructor(cardDeck){
        this.cards = cardDeck;
    };

    dealHand= (playerName) => {
        let dealerHand = new Hand(playerName, this.cards.pop(), this.cards.pop());
    };

    startGame= () =>{
        let playerHand = dealHand('Sam');
        let dealerHand = dealHand('Dealer');

        
    };

    playersTurn = () =>{

    };

    dealersTurn = () => {

    };
}


const game = new BlackjackGame(shuffle(buildDeck()));


let dealerHand = new Hand('Dealer', shuffledCards.pop(), shuffledCards.pop());

// console.log('Dealer Hand', dealerHand);
console.log('Dealer Score', dealerHand.getScore());

let playerHand = new Hand('Sam', shuffledCards.pop(), shuffledCards.pop());

// console.log('Sams Hand', playerHand);
console.log('Sams Score', playerHand.getScore());

if (playerHand.getScore() !== BLACKJACK){

    while (playerHand.getScore() <17){
        playerHand.add(shuffledCards.pop());
    }

    const playerScore = playerHand.getScore();
    if(playerScore <=BLACKJACK){

        while (dealerHand.getScore() <=playerScore){
            dealerHand.add(shuffledCards.pop());
        }

        const dealerScore =dealerHand.getScore();
        if(dealerScore > BLACKJACK){
            console.log (playerHand.player + ' Wins!, Dealer went bust.');
        }else{
            console.log('Player score:' + playerScore + ' Dealer Score: '+ dealerScore);
            if (playerScore > dealerScore){
                console.log (playerHand.player + ' Wins!');
            }else{
                console.log (dealerHand.player + ' Wins!');
            }
        }

    }else{
        console.log (dealerHand.player + ' Wins! ' + playerHand.player + ' Went bust.');
    }

}else{
    console.log (playerHand.player + ' Wins!');
}

