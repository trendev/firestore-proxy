import { EventEmitter } from "events";
import request, { Options } from "request";

export const slackNotifier = new EventEmitter();

const options: Options = {
    headers: {
        Authorization: "Bearer xoxp-320251608305-320251609105-514455834913-879e451e9d4600e6d5abfaffd56f798f",
    },
    json: true,
    method: "POST",
    url: "https://slack.com/api/chat.postMessage",
};

slackNotifier.on("slack-notification", (text, footer) => {
    options.body = {
        attachments:
            [{
                color: "#FF0000",
                footer: `${footer}`,
                text: `*${text}*`,
            }],
        channel: "GF6D78C6A",
    };

    request(options, (err, response, body) => {
        if (err) {
            console.error(err);
        }
    });
});
