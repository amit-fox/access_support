
const { request_info_template } = require('../templates/request-submit');

const columns = ['name', 'role', 'env', 'approver'];

function generateOutput(fields){
    const output = { ...request_info_template} ;

    output.blocks[1].fields = [];

    let tmpFields = [];
    fields.forEach((field,idx) => {
        tmpFields.push({
            "type": "mrkdwn",
            "text": "*"+columns[idx]+":*\n"+ field.value
        });
    })
    output.blocks[1].fields = tmpFields;

    console.log(JSON.stringify(output))
    return output;
}

module.exports = {
    generateOutput
}