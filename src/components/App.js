import React from 'react';
import base, { firebaseApp } from '../base';
import { Nav } from './Nav';
import CreateUser from './CreateUser';
import Queue from './Queue';
import { getRandomAudio, getCurrentTime } from '../helpers';
// import { webNotification } from './webNotification';
import '../css/App.css';

class App extends React.Component {
	state = {
		inQueue: true,
		user: null,
		userId: '',
		currentUser: '',
		alert: false,
		queue: [],
		timestamp: ''
	};

	queueToggle = () => {
		this.setState(prevState => ({
			inQueue: !prevState.inQueue
		}));
	};

	queueState = inQueue => {
		// get current state
		let currentState = this.state.inQueue;

		// check so we're not constantly updating state
		if (inQueue !== currentState) {
			this.setState({ inQueue });
			// Web Notification
			this.requestDesktopNotificationPermission();
			// Play Audio
			getRandomAudio();
			// Set timestamp
			this.setTimestamp(getCurrentTime());
		}
	};

	getCurrentUser = user => {
		// get current state
		let currentState = this.state.currentUser;

		// check so we're not constantly updating state
		if (user !== currentState) {
			this.setState({ currentUser: user });

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
				userIdRef.set({ user });
			} else {
				console.log('Connection Issue');
			}
		});
	};

	requestDesktopNotificationPermission() {
		const cloudUrl = 'https://res.cloudinary.com/jwfreeman/image/upload/v1588478101/Queue/images';
		if (window.Notification && Notification.permission !== 'denied') {
			// status is "granted", if accepted by user
			const options = {
				body: "You're up!",
				image: require(`${cloudUrl}/notification_image.jpg`),
				icon: require(`${cloudUrl}/queue_logo.png`) // optional
			};

			const notify = new Notification('Queue', options);

			notify.onclick = e => {
				e.preventDefault(); // prevent the browser from focusing the Notification's tab
				window.open('https://www.google.com', '_blank');
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

	render() {
		return (
			<React.Fragment>
				<Nav user={this.state.user} />
				<h1>Get In Line</h1>
				<div className='container currentUser'>
					<button
						className={this.state.inQueue ? 'buttonRed buttonRound' : 'buttonGreen buttonRound'}
					/>
					<p>
						{this.state.currentUser}
						<span className='timestamp'>({this.state.timestamp})</span>
					</p>
				</div>
				<div className='container center'>
					{this.state.currentUser === this.state.user ? (
						<div className='center'>
							<a target='_blank' rel='noopener noreferrer' href='https://www.google.com/'>
								Login
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
					queueState={this.queueState}
					getCurrentUser={this.getCurrentUser}
				/>
			</React.Fragment>
		);
	}
}

export default App;
