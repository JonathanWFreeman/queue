import React from 'react';
import PropTypes from 'prop-types';
import { PrintQueue } from './PrintQueue';
import '../css/Queue.css';

class Queue extends React.Component {

	static propTypes = {
		queue: PropTypes.array.isRequired,
		getCurrentUser: PropTypes.func.isRequired,
		queueState: PropTypes.func.isRequired,
		// user: PropTypes.string.isRequired
	}

	componentDidUpdate() {
		const getQueue = Object.keys(this.props.queue).map(key => this.props.queue[key].user);
		const getCurrentUser = getQueue.shift();

		// console.log(JSON.stringify(getCurrentUser));

		// update current user state
		this.props.getCurrentUser(getCurrentUser);

		// check current user against top user in queue
		if (getCurrentUser === this.props.user) {
			this.props.queueState(false);
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
