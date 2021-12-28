import { element } from '../lib/style.js';

const render = ({ diskSpaceData }) => {
	let diskInt = parseInt(diskSpaceData);

	const diskColor = () => {
		const fullDisk = 256;
		let color = '';
		if (fullDisk - diskInt <= 100) color = '#5cb85c';
		else if (fullDisk - diskInt <= 128) color = '#f0ad4e';
		else if (fullDisk - diskInt <= 200) color = '#d9534f';

		return color;
	};

	let style = {
		...element,
		float: 'right',
		borderBottom: `1px solid ${diskColor()}`,
		marginRight: '5px'
	};

	return (
		<span style={style}>
			{diskSpaceData}
			<i className="fa fa-hdd" style={{ paddingLeft: '10px' }}></i>
		</span>
	);
};

export default render;
