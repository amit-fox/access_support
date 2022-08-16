const request_info_template = {
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "Please provide below information",
        "emoji": true
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "input",
      "element": {
        "type": "plain_text_input",
        "action_id": "plain_text_input-action"
      },
      "label": {
        "type": "plain_text",
        "text": "Enter your name ",
        "emoji": true
      }
    },
    {
      "type": "input",
      "element": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select an item",
          "emoji": true
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "admin",
              "emoji": true
            },
            "value": "admin"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "operator",
              "emoji": true
            },
            "value": "operator"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "other",
              "emoji": true
            },
            "value": "other"
          }
        ],
        "action_id": "static_select-action"
      },
      "label": {
        "type": "plain_text",
        "text": "Select Role ",
        "emoji": true
      }
    },
    {
      "type": "input",
      "element": {
        "type": "multi_static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select options",
          "emoji": true
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "dev1",
              "emoji": true
            },
            "value": "dev1"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "qa1",
              "emoji": true
            },
            "value": "qa1"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "prod1",
              "emoji": true
            },
            "value": "prod1"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "instage",
              "emoji": true
            },
            "value": "instage"
          }
        ],
        "action_id": "multi_static_select-action"
      },
      "label": {
        "type": "plain_text",
        "text": "Select Environment",
        "emoji": true
      }
    },
    {
      "type": "input",
      "element": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select an item",
          "emoji": true
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Approver1 ",
              "emoji": true
            },
            "value": "Approver1 "
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Approver 2",
              "emoji": true
            },
            "value": "Approver 2"
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Approver 3",
              "emoji": true
            },
            "value": "Approver 3"
          }
        ],
        "action_id": "static_select-action"
      },
      "label": {
        "type": "plain_text",
        "text": "Select approver",
        "emoji": true
      }
    },
    {
      "type": "actions",
      "block_id": "submit_request_form",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Submit Request",
            "emoji": true
          },
          "value": "click_me_123",
          "action_id": "actionId-0"
        }
      ]
    }
  ]
};

module.exports = {
  request_info_template,
};
