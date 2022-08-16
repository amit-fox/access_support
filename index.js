const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { createMessageAdapter } = require("@slack/interactive-messages");
const { WebClient } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api");
const { request_info_template } = require("./templates/request-form-template");
const { attachmentParser } = require('./utils/attachmentValuesParser');

require("dotenv").config({
  path: path.resolve(__dirname, "./test.env"),
});

const PORT = process.env.PORT || 3000;
const signInSecret = process.env.SIGNIN_SECRET;
const slackToken = process.env.AUTH_TOKEN;

const app = express();
const slackEvent = createEventAdapter(signInSecret);
const slackInteractions = createMessageAdapter(signInSecret);
const slackClient = new WebClient(slackToken);
// app.use(express.json());

app.use("/interactive-endpoint", slackInteractions.requestListener());
app.use(slackEvent.requestListener());
// app.use(bodyParser.json());
// slack events specific
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

// disable message as of now
// slackEvent.on("message", (evt) => {
//   console.log("channel messege>>", evt);
//   const { text, user, channel, team, bot_id } = evt;
//   if (bot_id) return;
//   (async () => {
//     try {
//       await slackClient.chat.postMessage({
//         channel: evt.channel,
//         text: `Hello <@${evt.user}> :tada`,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   })();
// });
slackEvent.on("error", console.error);

// slack interaction
slackInteractions.action({ type: "button" }, (payload, respond) => {
  // Logs the contents of the action to the console
  console.log("payload", payload);
  const submmittedData = attachmentParser(payload.state.values);
  const requestData = JSON.stringify(submmittedData,null,2);
  
  (async () => {
    try {
      await slackClient.chat.postMessage({
        channel: 'C03SYJ44292',
        text: `Hi :wave:`,
        attachments: [
          {
            "color": "#f2c744",
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "You have a new request"
                }
              },
              {
                "type": "section",
                "fields": [
                  {
                    "type": "mrkdwn",
                    "text": "*Name:*\n"+ submmittedData[0].value
                  },
                  {
                    "type": "mrkdwn",
                    "text": "*Role:*\n"+ submmittedData[1].value
                  },
                  {
                    "type": "mrkdwn",
                    "text": "*Env:*\n"+ submmittedData[2].value
                  },
                  {
                    "type": "mrkdwn",
                    "text": "*Approver:*\n"+ submmittedData[3].value
                  },
                ]
              }
            ]
          }
        ]
      });
      respond({ text: "Processing complete.", replace_original: true });
      return { text: "Processing..." };
    } catch (err) {
      console.log(err);
      return { text: "Failed Processing..." };
    }
  })();
});

// app specific
app.post("/slack/events", (req, res) => {
  console.log('validate')
  res.send({
    challenge: req.body.challenge,
  });
});

app.post("/interactive-endpoint", (req, res) => {
  console.log("interactive-endpoint>>>", JSON.parse(req.body));
  console.log("-------------");
  console.log(req.body.state.values);
  //res.send({});
});

app.get("/", (req, res) => {
  res.send("Hello there , If you this it means server is up");
});

app.listen(PORT, () => {
  console.log("Magic happens at port", PORT);
});
