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
