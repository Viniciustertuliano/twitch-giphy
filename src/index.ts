import Twitch from "twitch-js";
import config from "./config/config";
import Giphy from "giphy-api";
import express from "express";

const giphy = Giphy(config.giphy);

const { api, chat, chatConstants } = new Twitch({
    token: config.identity.token,
    username: config.identity.username
});

//listen to all events 
const log = (msg: any) => console.log(msg);
chat.on(chatConstants.EVENTS.ALL, log);

//connect
chat.connect().then(() => {
    // ... and then join the channel.
    chat.join(config.channels[0]);
});

// listen to private messages
chat.on("PRIVMSG", privateMessage => {
    log("Private message MAOE" + privateMessage);
    const color = privateMessage.tags.color;
    const username = privateMessage.username;
    const message = privateMessage.message;

    if (message.startsWith("!giphy")) {
        const gif_search = message.substring(6).trim(); // GIF search term
        if (gif_search != "") {

            //translate search with options 
            giphy.translate({
                s: gif_search,
                rating: 'g',
            }, function (err, res) {
                log(err);
                log(res);
                if (err == null) {
                    const gif_embed = res.data.embed_url;

                    chat.say(config.channels[0], "@" + username + ",Toma seu GIF: " + gif_embed);

                } else {
                    chat.say(config.channels[0], "@" + username + ", Desculpa não achei GIF sobre " + gif_search);
                }
            });


            chat.say(config.channels[0], "@" + username + ", Você quer um GIF sobre " + gif_search);

        })

        }
        
});



// express stuff
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log('Exemple app listening on port ${port}!'))