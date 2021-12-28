import { element } from '../lib/style.js';

const render = ({ downloadSpeedData }) => {
	const formatSpeed = () => {
		var regex = /[+-]?\d+(\.\d+)?/g;
		var float = downloadSpeedData.match(regex);

		return parseFloat(float);
	};

	const speedColor = () => {
		let speed = formatSpeed();
		let color = '';
		if (speed >= 80) color = '#5cb85c';
		if (speed < 80) color = '#f0ad4e';
		if (speed < 30) color = '#d9534f';

		return color;
	};

	let style = {
		...element,
		float: 'right',
		borderBottom: `1px solid ${speedColor()}`
	};

	return (
		<span style={style}>
			<i className="fa fa-download" style={{ paddingRight: '5px' }}></i>
			{formatSpeed()}
		</span>
	);
};

export default render;
