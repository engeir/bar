import { element } from '../lib/style.js';

const render = ({ config, output, error, side, space, focused, title }) => {
    var style = {
        ...element,
        ...config.style,
        float: side,
    }

    var spaceStyle = (position, s, f) => {
        var style = {
            height: "1px",
            display: 'inline-block',
            padding: '0 8px'
        }
        var b = s.split(',').map(Number);
        if (position == parseInt(f)) {
            style.borderBottom = '2px solid #00b300'
        } else if (b.includes(position) == true) {
            style.borderBottom = '2px solid #c678dd'
        }
        return style
    }

    let errorContent = (
        <span style={style}>!</span>
    )

    let workspaces = (
        <span style={style}>
        <span style={spaceStyle(1, space, focused)}>1</span>
        <span style={spaceStyle(2, space, focused)}>2</span>
        <span style={spaceStyle(3, space, focused)}>3</span>
        <span style={spaceStyle(4, space, focused)}>4</span>
        <span style={spaceStyle(5, space, focused)}>5</span>
        <span style={spaceStyle(6, space, focused)}>6</span>
        <span style={spaceStyle(7, space, focused)}>7</span>
        <span style={spaceStyle(8, space, focused)}>8</span>
        <span style={{ paddingLeft: '10px' }} >{title}</span>
        </span>
    )

    let noYabai = (
        <span style={{...style, opacity: 0.8}}>yabai not installed</span>
    )

    return workspaces//error ? errorContent : space, focused ? workspaces : noYabai
}

export default render
