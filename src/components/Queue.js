import React from 'react';
import PropTypes from 'prop-types';
import { PrintQueue } from './PrintQueue';
import '../css/Queue.css';

/*TODO:

assign user unique ID each connection (firebase .push()
https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html)
 
Pass shifted user to display showing who is currently in Rush
*/

class Queue extends React.Component {

	static propTypes = {
		queue: PropTypes.array.isRequired,
		getCurrentRushUser: PropTypes.func.isRequired,
		rushState: PropTypes.func.isRequired,
		// user: PropTypes.string.isRequired
	}

	componentDidUpdate() {
		const getQueue = Object.keys(this.props.queue).map(key => this.props.queue[key].user);
		const getCurrentUser = getQueue.shift();

		// console.log(JSON.stringify(getCurrentUser));

		// update current user state
		this.props.getCurrentRushUser(getCurrentUser);

		// check if current user can go into rush
		if (getCurrentUser === this.props.user) {
			this.props.rushState(false);
		}
	}

	render() {
		return (
			<React.Fragment>
				{this.props.queue.length > 1 ? (
					<div className='container userList'>
						<ul className='box'>
							<h2>Current Users in Queue:</h2>
							{Object.keys(this.props.queue)
								.slice(1)
								.map(key => (
									<PrintQueue
										key={key}
										index={key}
										queue={this.props.queue[key]}
										user={this.props.user}
										queuePosition={this.queuePosition}
									/>
								))}
						</ul>
					</div>
				) : null}
			</React.Fragment>
		);
	}
}

export default Queue;
