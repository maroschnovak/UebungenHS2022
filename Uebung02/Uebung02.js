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

    var choice = f.length*Math.random();
    var index = Math.floor(choice);
    return f[index];
}

console.log(wuerfeln());