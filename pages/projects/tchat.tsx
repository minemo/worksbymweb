import { NextPage } from "next";
import * as tmi from 'tmi.js'


const Tchat: NextPage = () => {
    const client = new tmi.Client({
        channels: [ 'didob007' ]
    });
    
    client.connect();
    
    client.on('message', (channel, tags, message, self) => {
        // "Alca: Hello, World!"
        console.log(`${tags['display-name']}: ${message}`);
    });

    return (
        <div>
        <h1>Twitch-Chat</h1>
        </div>
    );
}

export default Tchat