"use strict";


// Aufgabe 1

var L = [];

for (var i=1; i<100; i=i+2) {
    L.push(i);
}

console.log(L)


// Aufgabe 2

function wuerfeln() {
    var f = [1,2,3,4,5,6];

    var choice = 6*Math.random();

    var index = 0;

    if (choice < 1) {
        index = 0;
    }
    else if (choice < 2) {
        index = 1;
    }
    else if (choice < 3) {
        index = 2;
    }
    else if (choice < 4) {
        index = 3;
    }
    else if (choice < 5) {
        index = 4;
    }
    else if (choice < 6) {
        index = 5;
    }

    console.log(f[index]);
}

wuerfeln();