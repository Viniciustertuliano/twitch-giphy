import Twitch from "twitch-js"; 
import config from "./config/config";

console.log (config);

const {api, chat, chatConstants} = new Twitch({ token, username });

client.on("connected", (add, port ) => { 
    console.log('Conectou! ${add} e ${port}');
});

client.on("message", onMessageHandler);

// connect to twitch
client.connect();

