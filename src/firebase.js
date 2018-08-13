import firebase from 'firebase'
require('firebase/firestore')

var config = {
	apiKey: "AIzaSyAtYuzDUshjiBEB6_UwRlKviLlr9fe8ZoQ",
	authDomain: "x-effects.firebaseapp.com",
	databaseURL: "https://x-effects.firebaseio.com",
	projectId: "x-effects",
	storageBucket: "x-effects.appspot.com",
	messagingSenderId: "236170295239"
};
firebase.initializeApp(config);

export const db = firebase.firestore()
