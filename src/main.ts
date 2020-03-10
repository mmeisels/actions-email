const core = require('@actions/core');
const sendgrid = require('sendgrid');
const sgMail = require('@sendgrid/mail');
  
async function run() {
  const emailToAddress = core.getInput('emailToAddress');
  const emailFromAddress = core.getInput('emailFromAddress');
  const emailBody = core.getInput('emailBody');
  const emailTemplateID = core.getInput('emailTemplateID') || process.env.emailTemplateID;
  const unSubscribeGroupID = core.getInput('unSubscribeGroupID') || process.env.unSubscribeGroupID;
  const SENDGRID_API_KEY = core.getInput('SENDGRID_API_KEY') || process.env.SENDGRID_API_KEY;
  
  core.debug('Getting Read to Send the Email');
  
  if (emailTemplateID !== ''){
    sgMail.setApiKey(SENDGRID_API_KEY);
    var msg = {
      to: { email :emailToAddress , name: ''},
      from: { email :emailFromAddress , name: ''},
      templateId: emailTemplateID,
      asm: {
        group_id: unSubscribeGroupID
      },
    };
    const resultEmail = await sgMail.send(msg)
    .then(() => {
      core.debug('Email Send Status Code ' + resultEmail.statusCode);
      core.setOutput('Email Send Status Code', resultEmail.statusCode);
    })
    .catch((e) => {
        console.log(e);
    })
    return resultEmail;
  }
  else{
    sgMail.setApiKey(SENDGRID_API_KEY);
    var msg = {
      to: { email :emailToAddress , name: ''},
      from: { email :emailFromAddress , name: ''},
      html: emailBody,
      asm: {
        group_id: unSubscribeGroupID
      },
    };
    const resultEmail = await sgMail.send(msg)
    .then(() => {
      core.debug('Email Send Status Code ' + resultEmail.statusCode);
      core.setOutput('Email Send Status Code', resultEmail.statusCode);
    })
    .catch((e) => {
        console.log(e);
    })
    return resultEmail;
  }
}

async function execute() {
  try {
    return await run();
  } catch({ message }) {
    core.error('Failed to send message', message);
    core.setFailed(message);
  }
}

module.exports = execute;

execute();
