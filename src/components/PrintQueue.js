import React from 'react';

const PrintQueue = props => (
	<React.Fragment>
		<li>{props.queue.user}</li>
	</React.Fragment>
);

export { PrintQueue };
