import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'atomic-rush.firebaseapp.com',
	databaseURL: 'https://atomic-rush.firebaseio.com',
	// projectId: 'atomic-rush',
	storageBucket: 'atomic-rush.appspot.com'
	// messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING,
	// appId: process.env.REACT_APP_FIREBASE_APPID
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
