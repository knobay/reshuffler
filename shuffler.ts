var cardsontable = 50;
var hand = [];
var deck = [];
var debug = ["Program started"];
var table = [false];
var i = 0;
var cardsatatime = 0;
var cardspickedthistime = 0;
var cardtoDeal = 0;

for (i = 1; i <= cardsontable; i++) {
    table[i] = true;
}

function hideCard(id) {
    var el = document.getElementById(id);
    el.style.visibility = "hidden";
}

function pickCard(numberSent) {
    if (cardsontable > 0) {
        hideCard(numberSent);
        deck.push(numberSent);
        cardsontable--;
        table[numberSent] = false; //remember that card is no longer on the table
    }
}

function autoPick() {
    cardspickedthistime = 0;
    var cardsatatime = parseInt((<HTMLInputElement>document.getElementById("deal-number")).value);

    while (cardspickedthistime < cardsatatime && cardsontable > 0) {
        var myRandomNumber = Math.floor(Math.random() * 50);
        if (table[myRandomNumber + 1] == true) {
            pickCard(myRandomNumber + 1);
            cardspickedthistime++;
        }
    }
}

function dealCard(dummyindex) {
    var numbertodeal = parseInt((<HTMLInputElement>document.getElementById("deal-number")).value);

    for (i = 0; i < numbertodeal; i++) {
        var myRandomNumber = Math.floor(Math.random() * deck.length);
        cardtoDeal = parseInt(deck.splice(myRandomNumber, 1).toString());
        if (cardtoDeal > 0) {
            document.getElementById("myPanel").innerHTML += "<button>" + cardtoDeal + "</button>";
            hand.push(cardtoDeal);
        }
        else {
            debug.push("No card found");
        }
    }
}

function sortHand() {
    hand.sort(function (a, b) { return a - b });
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