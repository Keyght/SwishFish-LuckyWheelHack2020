var paused = false;

function getRandomInt(e) {
	return Math.floor(Math.random() * Math.floor(e));
}
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

//Page Visibility API
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
	hidden = "hidden";
	visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
	hidden = "msHidden";
	visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
	hidden = "webkitHidden";
	visibilityChange = "webkitvisibilitychange";
}

var canvas_var = document.getElementById("canvas");

function handleVisibilityChange() {
	if (document.visibilityState === "hidden") paused = true;
	else paused = false;
	console.log("game to pause:" + paused);
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
	alert(
		"This web requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
	);
} else {
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
//End of Page Visibility API

//changes for git
let map = getRandomInt(3);
let pipin = getRandomInt(2);

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
	(pipeUp.src = "images/pipeUp" + pipin + ".png"),
	(pipeBottom.src = "images/pipeBottom" + pipin + ".png"),
	(bird.style.width = "38px"),
	(bird.style.height = "26px"),
	(bg.style.width = "100%"),
	(bg.style.height = "100%");

// some variables
let cnst;
let gap = 100;
let constant;

let bX = 10;
let bY = 150;

let gravity = 3;

let score = 0;
// audio files

let fly = new Audio();
let scor = new Audio();
let fall = new Audio();
let music = new Audio();

let basesound = new Audio();
let basesound1 = new Audio();
let basesound2 = new Audio();
let basesound3 = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
fall.src = "sounds/fall.mp3";
music.src = "sounds/music1.mp3";
music.play();

basesound1.src = "sounds/basesound1.mp3";
basesound2.src = "sounds/basesound2.mp3";
basesound3.src = "sounds/basesound3.mp3";

//let number_sound = getRandomArbitrary(1, 3);
//if (number_sound==1) {basesound=basesound1;}
//else if (number_sound==2) {basesound=basesound2;}
//else if (number_sound==3) {basesound=basesound3;}
//basesound.play();

// on key down and press

function moveUp(time) {
	if (time == 8) fly.play();
	bY -= 8 - time;
	if (time > 0)
		setTimeout(() => {
			moveUp(--time);
		}, 15);
	gravity = 3;
}
document.addEventListener("keydown", moveUp(5));
document.addEventListener("touchstart", function (e) {
	moveUp(8);
});

// pipe coordinates

let pipe = [];

pipe[0] = {
	x: cvs.width,
	y: -bY,
};
function show_alert(score) {
	// died sound
	fall.play();
	music.pause();
	alert("Game over!\nyour points: " + score);
}
//Web Workers API
		//worker = new Worker("js/MusicWorker.js");
		//worker.onmessage = receivedWorkerMessage;
		//worker.postMessage(2);
		//function receivedWorkerMessage(event) {
		//}
//End Web Workers API

function draw() {
	if (paused != true) {
		basesound.play();
		ctx.drawImage(bg, 0, 0);
		for (let i = 0; i < pipe.length; i++) {
			constant = pipeUp.height + gap;
			ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
			ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + constant);

			pipe[i].x--;

			cnst = getRandomArbitrary(-150, 150);
			if (pipe[i].x == 70 && pipe[i].y + cnst < 0 && pipe[i].y + cnst > -344) {
				pipe.push({
					x: cvs.width,
					y: pipe[i].y + cnst,
				});
			} else if (
				pipe[i].x == 70 &&
				(pipe[i].y + cnst >= 0 || pipe[i].y + cnst <= -344)
			) {
				pipe.push({
					x: cvs.width,
					y: pipe[i].y - cnst,
				});
			}

			// detect collision
			if (
				(bX + bird.width - 10 >= pipe[i].x &&
					bX <= pipe[i].x + pipeUp.width + 10 &&
					(bY + 10 <= pipe[i].y + pipeUp.height ||
						bY + bird.height - 5 >= pipe[i].y + constant)) ||
				bY + bird.height >= cvs.height - fg.height
			) {
				setTimeout(show_alert(score), 1);
				location.reload();
				return;
			}
			if (pipe[i].x == 5) {
				score++;
				scor.play();
			}
		}
		ctx.drawImage(fg, 0, cvs.height - fg.height);

		ctx.drawImage(bird, bX, bY);
		if (bY < 500) {
			bY += Math.log(gravity);
			gravity *= 1.05;
			ctx.fillStyle = "#fff";
			ctx.font = "20px Verdana";
			ctx.fillText("Score : " + score, 10, cvs.height - 20);
			requestAnimationFrame(draw);
		}
	}
}
pipeBottom.onload = draw;
