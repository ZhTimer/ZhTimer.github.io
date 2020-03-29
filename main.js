var amount = 0

var clsStopwatch = function () {
  // Private vars
  var startAt = 0; // Time of last start / resume. (0 if not running)
  var lapTime = 0; // Time on the clock when last stopped in milliseconds

  var now = function () {
    return new Date().getTime();
  };

  this.start = function () {
    startAt = startAt ? startAt : now();
  };

  this.stop = function () {
    lapTime = startAt ? lapTime + now() - startAt : lapTime;
    startAt = 0; // Paused
  };

  // Reset
  this.reset = function () {
    lapTime = startAt = 0;
  };

  // Duration
  this.time = function () {
    return lapTime + (startAt ? now() - startAt : 0);
  };
};

var x = new clsStopwatch();
var $time;
var clocktimer;

function pad(num, size) {
  var s = "0000" + num;
  return s.substr(s.length - size);
}

function formatTime(time) {
  var h = m = s = ms = 0;
  var newTime = '';

  h = Math.floor(time / (60 * 60 * 1000));
  time = time % (60 * 60 * 1000);
  m = Math.floor(time / (60 * 1000));
  time = time % (60 * 1000);
  s = Math.floor(time / 1000);
  ms = time % 1000;

  newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
  return newTime;
}

function show() {
  $time = document.getElementById('time');
  update();
}

function update() {
  $time.innerHTML = formatTime(x.time());
}

function start() {
  clocktimer = setInterval("update()", 1);
  bghide();
  document.querySelector("body").style.transition = "background-color 0.5s ease-in"
  document.querySelector("body").style.backgroundColor = "green"
  x.start();
  amount = amount + 1;
}

function stop() {
  x.stop();
  bgshow();
  document.querySelector("body").style.backgroundColor = "red";
  timePrint()
  clearInterval(clocktimer);
}

function reset() {
  x.reset();
  update();
}

// Keypress Script; Fix this mess shit head
var pressed = true;
var solveDone = false;
document.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 32) {
		  if (pressed) {
		    if (solveDone == true) {
		  	   reset();
		    } 
		    start();
          pressed = false;
        } else {
          stop()
          pressed = true;
		    solveDone = true;
      }
     } else {
     	stop();
     }
  if (event.keyCode == 82) {
    reset();  
	}    
});

var black = true
function darkmode() {
	if (black) {
		var element = document.body;
		element.classList.toggle("body");
		black = false;
	} else {
		var element = document.body;
		element.classList.toggle("body");
		black = true;
	}
}

function bghide() {
	document.querySelector("h1").style.visibility = "hidden";
	document.querySelector("#p").style.visibility = "hidden";
	document.querySelector("#light").style.visibility = "hidden";
	document.querySelector("#gear").style.visibility = "hidden";
}

function bgshow() {
	document.querySelector("h1").style.visibility = "visible";
	document.querySelector("#p").style.visibility = "visible";
	document.querySelector("#light").style.visibility = "visible";
	document.querySelector("#gear").style.visibility = "visible";
}

function settings() {
				var x = document.getElementById("settings");
				if (x.style.display === "none")
		{
				x.style.display = "inline-block";
			} else {
				x.style.display = "none";
			}
		}


function timePrint() {
	var tag = document.createElement("p");
	var text = document.createTextNode(amount + ". " + formatTime(x.time()));
	tag.appendChild(text);
	document.querySelector('.times').appendChild(tag)
}