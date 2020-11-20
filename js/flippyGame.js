function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
var map = getRandomInt(3);
console.log("map after change 0  ", map);

let cvs = document.getElementById("canvas"),
	ctx = cvs.getContext("2d"),
	body_tag = document.querySelector("body"),
	canvas_tag = document.querySelector("canvas");
(body_tag.style.width = "100%"),
	(body_tag.style.height = "100%"),
	(body_tag.style.minHeight = "512px"),
	(canvas_tag.style.width = "100%"),
	(canvas_tag.style.height = "100%");
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
let fly = new Audio(),
	score_audio = new Audio();
(fly.src = "sounds/fly.mp3"), (score_audio.src = "sounds/score.mp3");
let gap = 120;
function moveUp() {
	(yPos -= 35), fly.play();
}
document.addEventListener("keydown", moveUp);
let pipe = [];
pipe[0] = { x: cvs.width, y: 0 };
let score = 0,
	xPos = 10,
	yPos = 150,
	grav = 2;
function draw() {
	ctx.drawImage(bg, 0, 0);
	for (let e = 0; e < pipe.length; e++)
		ctx.drawImage(pipeUp, pipe[e].x, pipe[e].y),
			ctx.drawImage(pipeBottom, pipe[e].x, pipe[e].y + pipeUp.height + gap),
			pipe[e].x--,
			125 == pipe[e].x &&
				pipe.push({
					x: cvs.width,
					y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
				}),
			((xPos + bird.width >= pipe[e].x &&
				xPos <= pipe[e].x + pipeUp.width &&
				(yPos <= pipe[e].y + pipeUp.height ||
					yPos + bird.height >= pipe[e].y + pipeUp.height + gap)) ||
				yPos + bird.height >= cvs.height - fg.height) &&
				location.reload(),
			5 == pipe[e].x && (score++, score_audio.play());
	ctx.drawImage(fg, 0, cvs.height - fg.height),
		ctx.drawImage(bird, xPos, yPos),
		(yPos += grav),
		(ctx.fillStyle = "#FFFFFF"),
		(ctx.font = "24px Arial"),
		ctx.fillText("Счет: " + score, 10, cvs.height - 20),
		requestAnimationFrame(draw);
}
pipeBottom.onload = draw;
