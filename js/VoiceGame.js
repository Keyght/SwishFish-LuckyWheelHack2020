var paused = false;

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
		logo.style.background = "white";
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

function getRandomInt(e) {
	return Math.floor(Math.random() * Math.floor(e));
}
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

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

let gravity = 2;

let score = 0;
// audio files

let fly = new Audio();
let scor = new Audio();
let fall = new Audio();
let music = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
fall.src = "sounds/fall.mp3";
music.src = "sounds/music1.mp3";
music.play();
// pipe coordinates
bubl = document.getElementById("bubl");
bublList = [
	document.getElementById("b1"),
	document.getElementById("b2"),
	document.getElementById("b3"),
];

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
		// power/MaxPower<1
		ctx.drawImage(bird, bX, bY);
		if (bY < 475) bY += gravity;
		const diff = power / MaxPower;
		if (bY > 0 && diff > 0) bY -= diff * 7;

		if (diff < 0.1) bubl.style.visibility = "hidden";
		else {
			const change = diff * 10;
			bubl.style.visibility = "visible";
			bublList.forEach((bubble) => {
				bubble.style.minHeight = String(change) + "px";
				bubble.style.minWidth = String(change) + "px";
			});
		}

		ctx.fillStyle = "#fff";
		ctx.font = "20px Verdana";
		ctx.fillText("Score : " + score, 10, cvs.height - 20);
		requestAnimationFrame(draw);
	}
}
