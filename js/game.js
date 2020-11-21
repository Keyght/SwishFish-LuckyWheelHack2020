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

let Player = new Image(),
	bg = new Image(),
	fg = new Image(),
	pipeUp = new Image(),
	pipeBottom = new Image();

(Player.src = "images/fish/fish" + map + ".png"),
	(bg.src = "images/water/water" + map + ".png"),
	(pipeUp.src = "images/pipeUp.png"),
	(pipeBottom.src = "images/pipeBottom.png"),
	(Player.style.width = "38px"),
	(Player.style.height = "26px"),
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

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
fall.src = "sounds/fall.mp3";

// on key down and press

function moveUp(time) {
	if (time == 8) fly.play();
	bY -= 8 - time;
	console.log("moveUp -> time", time);
	console.log("moveUp -> bY", bY);
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
	alert("Game over!\nyour points: " + score);
}

function draw() {
	if (paused != true) {
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
				(bX <= pipe[i].x + pipeUp.width &&
				(bY+17 <= pipe[i].y + pipeUp.height ||
					bY + bird.height-5 >= pipe[i].y + constant)) ||
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

		ctx.drawImage(Player, bX, bY);
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
