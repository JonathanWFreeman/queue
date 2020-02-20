import React from 'react';
import { Alert } from './Alert';
import '../css/CreateUser.css';

class CreateUser extends React.Component {
	userRef = React.createRef();

	createUser = e => {
		e.preventDefault();

		const userNameOrig = this.userRef.current.value;

		var userName = userNameOrig.replace(/(<([^>]+)>)/gi, '');

		if (userName === '') {
			// console.log(this.userDescription);
			this.props.updateAlert(true);
			// console.log(this.props.alert);
		} else {
			// Set to local
			localStorage.setItem('user', userName);
			// Set to state
			this.props.updateUser(userName);
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className='fullBg'>
					{this.props.alert ? <Alert /> : null}
					<div className='formContainer box'>
						<p>New User, Who Dis?</p>
						<form onSubmit={this.createUser}>
							<input type='text' name='user' placeholder='Name' ref={this.userRef} />
							<button type='submit'>Submit</button>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateUser;
