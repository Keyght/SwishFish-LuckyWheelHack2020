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

ro.observe(document.querySelector("div"));

//#region  Web Storage API
// we can store money and name of player
if (typeof Storage !== "undefined") {
	if (localStorage.getItem("alreadyLoaded") == "true") {
		// get
		console.log("I Get Data from Storage.");
	} else {
		// set
		localStorage.setItem("point", "0");
		localStorage.setItem("money", "0");
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
	window.location.href = "/Game.html";
	localStorage.setItem("map", toString(map));
}
