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

let name, highscore, city, id;

+function ready() {
	name = document.getElementById('name');
	highscore = document.getElementById('best score');
	city = document.getElementById('name');
	id = document.getElementById('ident');
}

function insert() {
	ready();
	firebase.database().ref('person/'+id).set({
		NameOfPerson: name,
		Highscore: highscore,
		City: city,
		ID: id
	});
}

function select() {
	ready();
	firebase.database().ref('person/'+id).on('value',function(snapshot){
		name = snapshot.val().NameOfPerson;
		highscore = snapshot.val().Highscore;
		city = snapshot.val().City;
		id = snapshot.val().ID;
	};
}

function update() {
	ready();
	firebase.database().ref('person/'+id).update('value',function(snapshot){
		name = snapshot.val().NameOfPerson;
		highscore = snapshot.val().Highscore;
		city = snapshot.val().City;
	};
}

function del() {
	ready();
	firebase.database().ref('person/'+id).remove();
}