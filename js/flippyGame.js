//#region WebAudio
var context, logo, myElements, analyser, src, height;
var div = document.querySelector("#audioVisual");
var num = 32;
var array = new Uint8Array(num * 2);
var width = 10;
var body = document.querySelector("body");
window.onclick = function () {
	if (context) return;
	draw();
	body.querySelector("#audio").remove();
	for (var i = 0; i < num; i++) {
		logo = document.createElement("div");
		logo.className = "logo";
		logo.style.background = "red";
		logo.style.minWidth = width + "px";
		div.appendChild(logo);
	}
	myElements = document.getElementsByClassName("logo");
	context = new AudioContext();
	analyser = context.createAnalyser();

	navigator.mediaDevices
		.getUserMedia({
			audio: true,
		})
		.then((stream) => {
			src = context.createMediaStreamSource(stream);
			src.connect(analyser);
			loop();
		})
		.catch((error) => {
			alert(error + "\r\nRefused. The page will be updated!");
			location.reload();
		});
};
var MaxPower = 7500;
var power = 0;
function loop() {
	window.requestAnimationFrame(loop);
	analyser.getByteFrequencyData(array);
	power = 0;
	for (var i = 0; i < num; i++) {
		power += height;
		height = array[i + num];
		myElements[i].style.minHeight = height + "px";
		myElements[i].style.opacity = 0.008 * height;
	}

	// console.log("loop -> power", power);
}
//#endregion

//#region game
// fix game zooom

function getRandomInt(e) {
	return Math.floor(Math.random() * Math.floor(e));
}

var map = getRandomInt(3);

let cvs = document.getElementById("canvas"),
	ctx = cvs.getContext("2d"),
	body_tag = document.querySelector("body"),
	canvas_tag = document.querySelector("canvas");

(body_tag.style.width = "100%"),
	(body_tag.style.height = "100%"),
	(body_tag.style.minHeight = "512px"),
	(canvas_tag.style.width = "100%"),
	(canvas_tag.style.height = "100%");

// host = "https://more02.github.io/Lucky_wheel_hack2020/";

let bird = new Image(),
	bg = new Image(),
	fg = new Image(),
	pipeUp = new Image(),
	pipeBottom = new Image();

(bird.src = "images/fish/fish" + map + ".png"),
	(bg.src = "images/water/water" + map + ".png"),
	(pipeUp.src = "images/pipeUp.png"),
	(pipeBottom.src = "images/pipeBottom.png"),
	(bird.style.width = "38px"),
	(bird.style.length = "26px"),
	(bg.style.width = "100%"),
	(bg.style.height = "100%");

// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down and press
function moveUp() {
	bY -= 25;
	fly.play();
}
document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", function (e) {
	moveUp(e);
});

// pipe coordinates

var pipe = [];

pipe[0] = {
	x: cvs.width,
	y: 0,
};

function draw() {
	ctx.drawImage(bg, 0, 0);

	for (var i = 0; i < pipe.length; i++) {
		constant = pipeUp.height + gap;
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + constant);

		pipe[i].x--;

		if (pipe[i].x == 125) {
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
			});
		}

		// detect collision

		// if (
		// 	(bX + bird.width >= pipe[i].x &&
		// 		bX <= pipe[i].x + pipeUp.width &&
		// 		(bY <= pipe[i].y + pipeUp.height ||
		// 			bY + bird.height >= pipe[i].y + constant)) ||
		// 	bY + bird.height >= cvs.height - fg.height
		// ) {
		// 	location.reload(); // reload the page
		// }

		if (pipe[i].x == 5) {
			score++;
			scor.play();
		}
	}
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, bX, bY);
	// console.log((bY = 500 - (power / MaxPower) * 500));
	result = 500 - (power / MaxPower) * 500;
	bY = 500 - (power / MaxPower) * 500;
	if (bY < 475) {
		bY += gravity;
	}

	ctx.fillStyle = "#fff";
	ctx.font = "20px Roboto";
	ctx.fillText("points : " + score, 10, cvs.height - 20);
	requestAnimationFrame(draw);
}

//#endregion
