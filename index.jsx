// Update every second for the clock. Expensive elements should
// throttle themselves
export const refreshFrequency = 500 // ms

import dataModel from './lib/data.model.js';
import parse from './lib/parse.js';
import { theme } from './lib/style.js';
import {
    Battery,
    Cpu,
    Disk,
    Ip,
    Weather,
    MediaButtons,
    Speed,
    Time,
    Workspaces,
    Playing
} from './elements/index.jsx'

const config = {
    time: {
        format: "%H:%M:%S",
        style: {
            padding: '0 15px',
            backgroundColor: theme.backgroundLight,
        }
    },
    battery: {
        style: {}
    },
    workspaces: {
        style: {}
    },
    cpu: {
        style: {}
    },
    playing: {
        style: {}
    }
}

const barStyle = {
    top: 0,
    right: 0,
    left: 0,
    position: 'fixed',
    background: theme.background,
    overflow: 'hidden',
    color: theme.text,
    height: '25px',
    fontFamily: 'Helvetica',
    fontSize: '.9rem',
    boxShadow: '0px 2px 5px 0 #000000',
}


const result = (data, key) => {
    try {
        return JSON.parse(data)[key]
    } catch (e) {
        return ''
    }
}

export const command = `
BAT=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d';');
CHARGE=$(pmset -g batt | egrep "'([^']+).*'" -o --colour=auto |cut -f1 -d';')
SPACE=$(if command -v /usr/local/bin/yabai >/dev/null 2>&1; then echo $(/usr/local/bin/yabai -m query --spaces | /usr/local/bin/jq '.[] | select(.windows[0]) | .index' | sed 's/$/,/g' | tr -d '\n'); else echo ""; fi)
ACTIVESPACE=$(if command -v /usr/local/bin/yabai >/dev/null 2>&1; then echo $(/usr/local/bin/yabai -m query --spaces | /usr/local/bin/jq '.[] | select(.focused==1) | .index'); else echo ""; fi)
TITLE=$(if command -v /usr/local/bin/yabai >/dev/null 2>&1; then echo $(/usr/local/bin/yabai -m query --windows | /usr/local/bin/jq '.[] | select(.focused==1) | .title'| sed -e 's/^"//g' -e 's/"$//g' | cut -c 1-75); else echo ""; fi)
CPU=$(ps -A -o %cpu | awk '{s+=$1} END {print s "%"}')
DISK=$(df -H | grep '/dev/disk1s1' | awk '{ print $4 }')
IP=$(curl -s checkip.dyndns.org|sed -e 's/.*Current IP Address: //' -e 's/<.*$//')
LOC=Oslo
LOCATION=$(echo " ($LOC)")
TEMPERATURE=$(curl -s wttr.in/$LOC?format=%t)
WEATHERCONDITION=$(curl -s wttr.in/$LOC?format="%C")
SPOTIFY=$(osascript -e 'tell application "System Events"
    set processList to (name of every process)
    end tell
    if (processList contains "Spotify") is true then
    tell application "Spotify"
    if player state is playing then
    set artistName to artist of current track
    set trackName to name of current track
    return artistName & " - " & trackName
    else
    return ""
    end if
    end tell
    end if')


echo $(cat <<-EOF
{
    "battery": {
        "percentage": "$BAT",
        "charging": "$CHARGE"
    },
    "workspaces": {
        "space": "$SPACE",
        "focused": "$ACTIVESPACE",
        "title": "$TITLE"
    },
    "playing": "$SPOTIFY",
    "weather": {
        "temperature": "$TEMPERATURE",
        "weatherCondition": "$WEATHERCONDITION",
        "location": "$LOCATION"
    },
    "cpu": "$CPU",
    "disk": "$DISK",
    "ip": "$IP"
}
EOF
);
`

export const render = ({ output, error }) => {
    let data = dataModel;
    let shellData = parse(output);

    if (shellData != undefined) {
        data = shellData;
    }
    if(error) {
        console.log(new Date())
        console.log(error)
        console.log(String(error))
    }
    let errorContent = (
        <div style={barStyle}></div>
    )
    let content = (
        <div style={barStyle}>
        <link rel="stylesheet" type="text/css" href="bar/assets/font-awesome/css/all.min.css" />
        <Workspaces config={config.workspaces} title={data.workspaces.title} space={data.workspaces.space} focused={data.workspaces.focused} side="left" />
        {/* <MediaButtons /> */}

        <Playing config={config.playing} data={result(output, "playing")} />

        <Time config={config.time} side="right"></Time>
        <Battery config={config.battery} data={data.battery.percentage} charge={data.battery.charging} side="right" />
        <Weather loc={data.weather.location} tempData={data.weather.temperature} condData={data.weather.weatherCondition} />
        {/* <Ip ipAddressData={result(output, "ip")} /> */}
        <Disk diskSpaceData={result(output, "disk")} />
        <Cpu config={config.cpu} data={result(output, "cpu")} side="right" />
        </div>
    )
    return error ? errorContent : content
}
