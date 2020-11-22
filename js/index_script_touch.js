const ro = new ResizeObserver((entries) => {
	for (let entry of entries) {
		const width = entry.contentBoxSize
			? entry.contentBoxSize.inlineSize
			: entry.contentRect.width;
		if (entry.target.tagName === "div" && width < "100%") {
			entry.target.textContent = `I won't change anymore`;
			ro.unobserve(entry.target);
		}
	}
});
let music = new Audio();
music.src = "sounds/music0.mp3";
music.value = 0.2;
console.log(music.value);
music.play();
//Geolocation API
const status = document.querySelector("#status");
const mapLink = document.querySelector("#map-link");

mapLink.href = "";
mapLink.textContent = "";

function success(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	status.textContent = "";
	mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	mapLink.innerHTML =
		`Latitude: ${latitude} °` + "<br>" + `Longitude: ${longitude} °`;
}

function error() {
	status.textContent = "Unable to retrieve your location";
}

if (!navigator.geolocation) {
	status.textContent = "Geolocation is not supported by your browser";
} else {
	status.textContent = "Locating…";
	navigator.geolocation.getCurrentPosition(success, error);
}

//End of Geolocation API

ro.observe(document.querySelector("div"));

//#region  Web Storage API
// we can store money and name of player
if (typeof Storage !== "undefined") {
	if (localStorage.getItem("alreadyLoaded") == "true") {
		// get
		console.log("I Get Data from Storage.");
		document.getElementById("form__label").innerHTML = localStorage.getItem(
			"name"
		);

		document.getElementById("name").placeholder = localStorage.getItem("name");
		console.log('localStorage.getItem("name")', localStorage.getItem("name"));
	} else {
		// set
		localStorage.setItem("point", "0");
		localStorage.setItem("money", "0");
		localStorage.setItem("name", "Player");
		localStorage.setItem("alreadyLoaded", "true");
		localStorage.setItem("map", "0");
		console.log("done data");
	}

	// examples
} else {
	// cant load Storage Api
	alert("Sorry! No Web Storage support..");
}
//#endregion
function WhatMap(map) {
	console.log("map " + map);
	var url = document.location.host;
	// host = "https://more02.github.io/Lucky_wheel_hack2020/";
	window.location.href = "Game.html";
	localStorage.setItem("map", toString(map));
}
function changeName(name) {
	localStorage.setItem("name", name);
	console.log("changeName -> name", name);
}
//#region clipboard
function pasteApi() {
	navigator.clipboard
		.readText()
		.then(
			(clipText) => (document.getElementById("name").placeholder = clipText)
		);
}
//#endregion
