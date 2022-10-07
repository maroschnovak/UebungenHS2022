var t = 0;

function time() {
    t += 500;
    var d = new Date();

    var ds = d.toDateString();
    var ts = d.toTimeString();

    var time = document.getElementById("time");
    var day = document.getElementById("date");

    time.innerHTML = ts
    day.innerHTML = ds

    time.style["font-size"] = "50px";
    day.style["font-size"] = "50px";
}

function start() {
    if (t==0) {
        setInterval(time, 500);
    }
}