const path = require("path");
const { WebClient } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api");
const { request_info_template } = require("./templates/request-form-template");

require("dotenv").config({
  path: path.resolve(__dirname, "./test.env"),
});

const port = process.env.PORT || 3000;
const signInSecret = process.env.SIGNIN_SECRET;
const slackToken = process.env.AUTH_TOKEN;

const slackEvent = createEventAdapter(signInSecret);
const slackClient = new WebClient(slackToken);

// subscribe events here
// we need to provide scope value here
slackEvent.on("app_mention", (evt) => {
  console.log("app mention >>", evt);
  (async () => {
    try {
      await slackClient.chat.postMessage({
        channel: evt.channel,
        text: `Hello <@${evt.user}> :wave:`,
        attachments: [request_info_template],
      });
    } catch (err) {
      console.log(err);
    }
  })();
});

slackEvent.on("message", (evt) => {
  console.log("channel messege>>", evt);
  const { text, user, channel, team, bot_id } = evt;
  if (bot_id) return;
  (async () => {
    try {
      await slackClient.chat.postMessage({
        channel: evt.channel,
        text: `Hello <@${evt.user}> :tada`,
      });
    } catch (err) {
      console.log(err);
    }
  })();
});

slackEvent.on("error", console.error);
slackEvent.start(port).then(() => {
  console.log("Slack bot running at  : " + port);
});
