# Twilio SendGrid Send an Email GitHub Action

Send an Email from GitHub Actions.

## Prerequisites

- A Twilio SendGrid Account. [Sign up for free](https://https://signup.sendgrid.com/)
- A [SendGrid API Key](https://app.sendgrid.com/settings/api_keys) The documentation can be viewed here. (https://sendgrid.com/docs/ui/account-and-settings/api-keys/)

## Usage

1. Create an API Key to access the API.

2. Store the key in  `SENDGRID_API_KEY`

3. Create an Unsubscribe Group for the email receipents to unsubscribe from. This can be done here (https://app.sendgrid.com/suppressions/group_unsubscribes) and documentation here (https://sendgrid.com/docs/ui/sending-email/group-unsubscribes/#gatsby-focus-wrapper)

4. (Optional) Create an Email Template here: https://mc.sendgrid.com/dynamic-templates 

5. Add the following to your workflow

```yml
- name: 'Sending Email with SendGrid'
  uses: mmeisels/action-send-an-email-@v1
  with:
    emailToAddress: 'test@mike.com'
    emailFromAddress: 'from@mike.com'
    emailBody: 'email body text - can be html also'
    unSubscribeGroupID: 'unsusbcribe group ID from step 3'
    emailTemplateID: 'Email Template ID from Step 4'
  env:
    SENDGRID_API_KEY: ${{ secrets.SENDGRID_API_KEY }}
```

## Inputs

### `emailToAddress`

**Required** This is the Email Address you wish to send an email to

### `emailFromAddress`

**Required** This is the Email Address you wish to send an email from

### `SENDGRID_API_KEY`

**Required** The SendGrid API Key

### `emailBody`

If you are not using an email template, you need to pass the email body either as text or html in the message

### `unSubscribeGroupID`

The SendGrid Unsubscribe Group

### `emailTemplateID`

The SendGrid Email Template ID from Step 4

## Outputs

### `response`

The Response of the Email Interaction. Emails are Async - you can review the actual email response in the SendGrid Analytics or setup a webhook.

## Contributing

## Third Party Licenses

This GitHub Action uses a couple of Node.js modules to work.

License and other copyright information for each module are included in the release branch of each action version under `node_modules/{module}`.

More information for each package can be found at `https://www.npmjs.com/package/{package}`

## License

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
