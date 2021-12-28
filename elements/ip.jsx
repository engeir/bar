import { element } from '../lib/style.js';

const render = ({ ipAddressData }) => {
	var style = {
		...element,
		float: 'right',
		borderBottom: '1px solid #468488'
	};
	return (
		<span style={style}>
			<i className="fa fa-globe"></i> {ipAddressData}
		</span>
	);
};

export default render;
