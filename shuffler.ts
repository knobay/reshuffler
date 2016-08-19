var cardsontable = 50;
var i = 0; // generic counter
var cardsatatime = 0;  // will use to store the value in the dropdown
var cardspickedthistime = 0; // needed in a loop later on
var cardtoDeal = 0; // a variable used later

var debug = ["Program started"]; // an array for logging debugging messages in
var hand = []; // this represents the cards that have been dealt out of the deck
var deck = []; // these are the cards that have been picked off the table but haven't been dealt yet
var table = [true]; // this represents the table, not the values at each position, just whether there is a card there or not
for (i = 1; i <= cardsontable; i++) {
    table[i] = true;
}


// Make a card invisible, and hence not clickable, on the table
function hideCard(id) {
    var el = document.getElementById(id);
    el.style.visibility = "hidden";
}


// Try to pick a card off the table at the requested position if there are still cards on the table
function pickCard(numberSent) {
    if (cardsontable > 0) {
        hideCard(numberSent);
        deck.push(numberSent);
        cardsontable--;
        table[numberSent] = false; //remember that card is no longer on the table
    }
}


// Pick cards off the table as many times as required by the dropdown
function autoPick() {
    cardspickedthistime = 0;
    var cardsatatime = parseInt((<HTMLInputElement>document.getElementById("deal-number")).value); //get the value from the drop down as an integer

    while (cardspickedthistime < cardsatatime && cardsontable > 0) {  // keep trying to pick up cards until you've reached the number in the dropdown or there are no cards left on the table
        var myRandomNumber = Math.floor(Math.random() * 50);
        if (table[myRandomNumber + 1] == true) {  // only pick up a card if it's available on the table
            pickCard(myRandomNumber + 1);
            cardspickedthistime++;
        }
    }
}

function dealCard(dummyindex) { // deal cards from the deck to the hand
    var numbertodeal = parseInt((<HTMLInputElement>document.getElementById("deal-number")).value); //get the value from the dropdown as an integer
    for (i = 0; i < numbertodeal; i++) {
        var myRandomNumber = Math.floor(Math.random() * deck.length);
        cardtoDeal = parseInt(deck.splice(myRandomNumber, 1).toString());
        if (cardtoDeal > 0) {
            document.getElementById("myPanel").innerHTML += "<button>" + cardtoDeal + "</button>";
            hand.push(cardtoDeal);
        }
        else {
            debug.push("No card found");  // i think this runs if you try to deal when you have dealt all the cards in the hand
        }
    }
}

function sortHand() {  // sort the hand in memory, clear what's visibily in the hand then re render the hand.
    hand.sort(function (a, b) { return a - b });
    document.getElementById("myPanel").innerHTML = "";
    for (i = 0; i < hand.length; i++) {
        document.getElementById("myPanel").innerHTML += "<button>" + hand[i] + "</button>";
    }
}

function outputDebug() {  // put some standard stuff in the debug log then output it with whatever else has been logged there.
    debug.push("Deck now contains [" + deck + "]");
    debug.push("Hand now contains [" + hand + "]");
    while (debug.length > 0) {
        document.getElementById("debugPanel").innerHTML += (debug.shift() + "<br>");
    }
}