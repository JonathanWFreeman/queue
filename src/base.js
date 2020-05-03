import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'queue-af56a.firebaseapp.com',
	databaseURL: 'https://queue-af56a.firebaseio.com/',
	storageBucket: 'queue-af56a.appspot.com'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
