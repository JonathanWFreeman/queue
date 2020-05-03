import React from 'react';
import '../css/Nav.css';

const Nav = props => (
	<React.Fragment>
		<nav>
			<p className='currentUser'>{props.user}</p>
		</nav>
	</React.Fragment>
);

export { Nav };
