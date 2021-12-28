import { element } from '../lib/style.js';

const render = ({ config, output, error, side, data }) => {
    var style = {
        ...element,
        ...config.style,
        float: side,
    }
    return error ? (
        <span style={style}>!</span>
    ) : (
        <span style={style}>
        { data }
        <i className="fa fa-microchip" style={{padding: '0 0 0 10px'}}></i>
        </span>
    )
}

export default render
