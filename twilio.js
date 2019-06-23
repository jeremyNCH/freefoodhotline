const express = require('express');
const bodyParser = require('body-parser');
const r = require('request');
const https = require('https');
const fs = require('fs');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const accountSID = 'AC95892fb3be32f636805a227c5e85d7ef';
const authToken = '5425f58382ec0fea69a20ad4e3815052';
const client = require('twilio')(accountSID, authToken);

const app = express();
app.use(bodyParser.json({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Returns TwiML which prompts the caller to record a message
app.post('/', async (req, res) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();
  twiml.say('Hello. Please leave a message after the beep.');

  // Use <Record> to record the caller's message
  twiml.record({
    recordingStatusCallback: '/callAzure'
  });

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/callAzure', (req, res) => {
  const recordingURL = req.body.RecordingUrl;
  console.log('recordingURL: ', recordingURL);

  let file = fs.createWriteStream("record.wav");
  try {
    // r.get(recordingURL + '.mp3')
    //   .on('response', res => {
    //     if (res.statusCode === 200) {
    console.log('getting record...');
    //       req.pipe(file);
    //     }
    //   });
    var request = https.get(recordingURL, function (response) {
      response.pipe(file);
    });
  } catch (err) {
    console.log('get record failed...', err);
    throw err;
  }

  res.send('calling Azure...');
});

// Create an HTTP server and listen for requests on port 3000
console.log('Twilio running on port 1337');
app.listen(1337, '127.0.0.1');