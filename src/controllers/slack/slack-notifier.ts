import { EventEmitter } from "events";
import request, { Options } from "request";
import slackConfig from "../../creds/slack-config.json";

export const DEFAULT_EVENT = "slack-notification";
export const slackNotifier = new EventEmitter();

const options: Options = {
    headers: {
        Authorization: `Bearer ${slackConfig.token}`,
    },
    json: true,
    method: "POST",
    url: "https://slack.com/api/chat.postMessage",
};

slackNotifier.on(DEFAULT_EVENT, (msg, error) => {
    options.body = {
        attachments:
            [{
                color: "#FF0000",
                footer: `${error}`,
                text: `*${msg}*`,
            }],
        channel: slackConfig.channel,
    };

    request(options, (err, response, body) => {
        if (err) {
            console.error(err);
        }
    });
});
