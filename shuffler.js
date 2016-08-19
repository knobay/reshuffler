var cardsontable = 50;
var i = 0; // generic counter
var cardsatatime = 0; // will use to store the value in the dropdown
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
    var cardsatatime = parseInt(document.getElementById("deal-number").value); //get the value from the drop down as an integer
    while (cardspickedthistime < cardsatatime && cardsontable > 0) {
        var myRandomNumber = Math.floor(Math.random() * 50);
        if (table[myRandomNumber + 1] == true) {
            pickCard(myRandomNumber + 1);
            cardspickedthistime++;
        }
    }
}
function dealCard(dummyindex) {
    var numbertodeal = parseInt(document.getElementById("deal-number").value); //get the value from the dropdown as an integer
    for (i = 0; i < numbertodeal; i++) {
        var myRandomNumber = Math.floor(Math.random() * deck.length);
        cardtoDeal = parseInt(deck.splice(myRandomNumber, 1).toString());
        if (cardtoDeal > 0) {
            document.getElementById("myPanel").innerHTML += "<button>" + cardtoDeal + "</button>";
            hand.push(cardtoDeal);
        }
        else {
            debug.push("No card found"); // can't imagine why this would ever happen, probably redundant'
        }
    }
}
function sortHand() {
    hand.sort(function (a, b) { return a - b; });
    document.getElementById("myPanel").innerHTML = "";
    for (i = 0; i < hand.length; i++) {
        document.getElementById("myPanel").innerHTML += "<button>" + hand[i] + "</button>";
    }
}
function outputDebug() {
    debug.push("Deck now contains [" + deck + "]");
    debug.push("Hand now contains [" + hand + "]");
    while (debug.length > 0) {
        document.getElementById("debugPanel").innerHTML += (debug.shift() + "<br>");
    }
}
