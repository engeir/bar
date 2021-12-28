import { element } from '../lib/style.js';
import { run } from 'uebersicht';

const render = () => {
    var style = {
        ...element,
        float: 'left',
        borderBottom: '10px solid #468488',
        marginLeft: '10px'
    };
    let spacing = {
        paddingLeft: '25px'
    };
    return (
        <span style={style}>
        <i
        className="fa fa-backward"
        style={spacing}
        onClick={() => {
            run('/usr/local/bin/spotify prev')
                .then(output => console.log(output))
                .catch(err => {
                    console.log(err);
                });
        }}
        ></i>
        <i
        className="fa fa-play"
        style={spacing}
        onClick={() => {
            run('/usr/local/bin/spotify pause')
                .then(output => console.log(output))
                .catch(err => {
                    console.log(err);
                });
        }}
        ></i>
        <i
        className="fa fa-pause"
        style={spacing}
        onClick={() => {
            run('/usr/local/bin/spotify pause')
                .then(output => console.log(output))
                .catch(err => {
                    console.log(err);
                });
        }}
        ></i>
        <i
        className="fa fa-forward"
        onClick={() => {
            run('/usr/local/bin/spotify next')
                .then(output => console.log(output))
                .catch(err => {
                    console.log(err);
                });
        }}
        style={spacing}
        ></i>
        </span>
    );
};

export default render;
