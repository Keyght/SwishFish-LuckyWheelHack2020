// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyAS_q-BVjGc2VuG9xxz69g0pyzuNsH6eSQ",
	authDomain: "swish-fish.firebaseapp.com",
	databaseURL: "https://swish-fish.firebaseio.com",
	projectId: "swish-fish",
	storageBucket: "swish-fish.appspot.com",
	messagingSenderId: "221101981086",
	appId: "1:221101981086:web:4fc515232db5717ce6aa8f",
	measurementId: "G-28PRKFXRMW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// database
let database = firebase.database();

let name, highscore, city, money, id;

function send() {
	add();
	firebase
		.database()
		.ref("person/" + name)
		.set({
			NameOfPerson: name,
			Highscore: highscore,
			City: city,
			Money: money,
			ID: id,
		});
}
