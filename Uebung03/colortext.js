var kurs = 1.03;

function change() {
    
    var eing = document.querySelector("#eingabe");
    var p = document.getElementById("change");

    var eingneu = eing.value;

    p.innerHTML = eingneu;

    var random = Math.floor(Math.random()*16777215).toString();
    var farbe = "#" + random;

    p.style["color"] = farbe;
    p.style["font-size"] = "100px";
    p.style["margin"] = "10px 10px";
}