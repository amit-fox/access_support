const request_info_template = {
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
        ]
      },
      {
        "type": "actions",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Approve"
                },
                "style": "primary",
                "value": "click_me_123"
            },
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Deny"
                },
                "style": "danger",
                "value": "click_me_123"
            }
        ]
    }
    ]
  }

  module.exports = {
    request_info_template,
  };