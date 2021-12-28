import { element } from '../lib/style.js';

const render = ({ loc, tempData, condData }) => {
	var temp = parseInt(tempData);

	const tempColor = () => {
		let color = '';
		if (temp <= 10) color = '#48dbfb';
		if (temp > 10 && temp <= 20) color = '#44bd32';
		if (temp > 20) color = '#f0932b';
		return color;
	};

	const conditionIcon = condition => {
		var currentCondition = condition;
		if (
			currentCondition.includes('Rain') ||
			currentCondition.includes('rain') ||
			currentCondition.includes('Drizzle') ||
			currentCondition.includes('drizzle')
		) {
			return 'cloud-rain';
		}
		if (
			currentCondition.includes('Sun') ||
			currentCondition.includes('sun')
		) {
			return 'sun';
		}
		if (
			currentCondition.includes('Cloudy') ||
			currentCondition.includes('Overcast') ||
			currentCondition.includes('cloudy') ||
			currentCondition.includes('overcast')
		) {
			return 'cloud';
		}
		if (
			currentCondition.includes('Snow') ||
			currentCondition.includes('snow')
		) {
			return 'snowflake';
		}
		if (
			currentCondition.includes('Mist') ||
			currentCondition.includes('mist') ||
			currentCondition.includes('Fog') ||
			currentCondition.includes('fog')
		) {
			return 'smog';
		}

		return 'cloud';
	};

	var style = {
		...element,
		float: 'right',
		borderBottom: `1px solid ${tempColor()}`
	};

	return (
		<span style={style}>
			<i className={`fa fa-${conditionIcon(condData)}`} style={{ paddingRight: '5px' }} ></i>
			{tempData}
			{loc}
		</span>
	);
};

export default render;
