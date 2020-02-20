import React from 'react';
import base, { firebaseApp } from '../base';
import { Nav } from './Nav';
import CreateUser from './CreateUser';
import Queue from './Queue';
import { randomAudio, getCurrentTime } from '../helpers';
// import { webNotification } from './webNotification';
import '../css/App.css';

/*TODO: List 
 * 
 ** Loading State
 ** Dev / Production states
 ** Switch from starting off as not inrush, to being inrush unless in queue - might get rid of some issues with double checks
 * 
*/
class App extends React.Component {
	state = {
		inRush: true,
		user: null,
		userId: '',
		currentRushUser: '',
		alert: false,
		queue: [],
		timestamp: ''
	};

	rushToggle = () => {
		this.setState(prevState => ({
			inRush: !prevState.inRush
		}));
	};

	rushState = inRush => {
		// get current state
		let currentState = this.state.inRush;

		// check so we're not constantly updating state
		if (inRush !== currentState) {
			this.setState({ inRush });
			// Web Notification
			this.requestDesktopNotificationPermission();
			// Play Audio
			randomAudio();
			// Set timestamp
			this.setTimestamp(getCurrentTime());
		}
	};

	getCurrentRushUser = user => {
		// get current state
		let currentState = this.state.currentRushUser;

		// check so we're not constantly updating state
		if (user !== currentState) {
			this.setState({ currentRushUser: user });

			this.getTimestamp();
		}
	};

	setTimestamp = time => {
		// Set time to firebase
		const timeRef = firebaseApp.database().ref('timestamp');
		timeRef.set({ time: time });
	};

	getTimestamp = () => {
		// Get time from firebase
		const timeRef = firebaseApp.database().ref('timestamp');

		timeRef.on('value', snap => {
			if (snap.val()) {
				const time = snap.val()['time'];
				console.log(time);
				this.setState({ timestamp: time });
			} else {
				console.log('Connection Issue');
			}
		});
	};

	updateUser = user => {
		// Update Firebase
		const queueRef = firebaseApp.database().ref('user');
		const userIdRef = queueRef.push();
		const key = userIdRef.key;

		this.setState({ user, userId: key });

		this.userConnection(user, userIdRef);
	};

	updateAlert = bool => {
		this.setState({ alert: bool });
	};

	userConnection = (user, userIdRef) => {
		// Check user connection
		const userConnectedRef = firebaseApp.database().ref('.info/connected');

		userConnectedRef.on('value', function(snap) {
			if (snap.val()) {
				userIdRef.onDisconnect().remove();
				userIdRef.set({ user: user });
			} else {
				console.log('Connection Issue');
			}
		});
	};

	requestDesktopNotificationPermission() {
		if (window.Notification && Notification.permission !== 'denied') {
			// status is "granted", if accepted by user
			const options = {
				body: "It's Rush Time!",
				image: require('../images/jerms.jpg'),
				icon: require('../images/adc_logo.png') // optional
			};

			const notify = new Notification('Atomic Rush', options);

			notify.onclick = e => {
				e.preventDefault(); // prevent the browser from focusing the Notification's tab
				window.open('https://www.semrush.com', '_blank');
			};
		}
	}

	componentDidMount() {
		// Reinstate LocalStorage
		const localStorageUserRef = localStorage.getItem('user');

		if (localStorageUserRef) {
			this.setState({ user: localStorageUserRef });
			this.updateUser(localStorageUserRef);
		}

		// Toggle Rush
		// base.syncState(`rushToggle`, {
		// 	context: this,
		// 	state: 'inRush'
		// });

		// Listen to Queue
		base.bindToState('user', {
			context: this,
			asArray: true,
			state: 'queue'
		});

		// Check / Request Web Notification
		if (Notification.permission !== 'granted' || Notification.permission !== 'denied') {
			Notification.requestPermission();
		}
	}

	// const itemsRef = firebaseApp.database().ref('items');
	// itemsRef.push(this.state.inRush);

	render() {
		return (
			<React.Fragment>
				<Nav user={this.state.user} />
				<h1>Anyone In Rush?</h1>
				<div className='container currentUser'>
					<button
						// onClick={this.rushToggle}
						className={this.state.inRush ? 'buttonRed buttonRound' : 'buttonGreen buttonRound'}
					/>
					<p>
						{this.state.currentRushUser}
						<span className='timestamp'>({this.state.timestamp})</span>
					</p>
				</div>
				<div className='container center'>
					{this.state.currentRushUser === this.state.user ? (
						<div className='center'>
							<a target='_blank' rel='noopener noreferrer' href='https://www.semrush.com/'>
								Login to Rush
							</a>
						</div>
					) : null}
				</div>
				{this.state.user ? null : (
					<CreateUser updateUser={this.updateUser} alert={this.state.alert} updateAlert={this.updateAlert} />
				)}
				<Queue
					queue={this.state.queue}
					user={this.state.user}
					rushState={this.rushState}
					getCurrentRushUser={this.getCurrentRushUser}
				/>
			</React.Fragment>
		);
	}
}

export default App;
