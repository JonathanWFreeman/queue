import React from 'react';
import '../css/Nav.css';

// class Nav extends React.Component {
//   render() {
//     return(
//       <React.Fragment>

//       </React.Fragment>
//     )
//   }
// }

const Nav = props => (
	<React.Fragment>
		<nav>
			<p className='currentUser'>{props.user}</p>
		</nav>
	</React.Fragment>
);

export { Nav };
