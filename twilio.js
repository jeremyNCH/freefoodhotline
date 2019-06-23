const express = require('express');
const bodyParser = require('body-parser');
const r = require('request');
const https = require('https');
const http = require('http');
const fs = require('fs');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const sdk = require("microsoft-cognitiveservices-speech-sdk");


const accountSID = 'AC95892fb3be32f636805a227c5e85d7ef';
const authToken = '5425f58382ec0fea69a20ad4e3815052';
const client = require('twilio')(accountSID, authToken);

// azure configs
const subscriptionKey = "60e445e1-a874-4dd9-a884-b139794740d3";
const serviceRegion = "westus"; // e.g., "westus"
const filename = "record.wav"; // 16000 Hz, Mono

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

// function speechToText() {
//   // create the push stream we need for the speech sdk.
//   const pushStream = sdk.AudioInputStream.createPushStream();

//   // open the file and push it to the push stream.
//   fs.createReadStream(filename).on('data', (arrayBuffer) => {
//     pushStream.write(arrayBuffer.buffer);
//   }).on('end', () => {
//     pushStream.close();
//   });

//   // we are done with the setup
//   console.log("Now recognizing from: " + filename);

//   // now create the audio-config pointing to our stream and
//   // the speech config specifying the language.
//   const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
//   const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

//   // setting the recognition language to English.
//   speechConfig.speechRecognitionLanguage = "en-US";

//   // create the speech recognizer.
//   const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
//   recognizer.recognized = recognizer.recognizing = (s, e) => {
//     console.log("e: ", e);
//     console.log("s: ", s);
//   }
//   // start the recognizer and wait for a result.
//   recognizer.recognizeOnceAsync(
//     (result) => {
//       console.log(result);

//       recognizer.close();
//       recognizer = undefined;
//     },
//     (err) => {
//       console.trace("err - " + err);

//       recognizer.close();
//       recognizer = undefined;
//     });
// }
const Lame = require("node-lame").Lame;
// let wav = require('node-wav');

app.post('/callAzure', (req, res) => {
  const recordingURL = req.body.RecordingUrl;
  console.log('recordingURL: ', recordingURL);

  let file = fs.createWriteStream(filename);
  try {
    console.log('getting record...');
    // https.get(recordingURL, (response) => {
    //   response.pipe(file);
    // });

    // let buffer = fs.readFileSync('record.wav');
    // let result = wav.decode(buffer);
    // console.log("sample rate: ", result.sampleRate);
    // console.log("channdel data: ", result.channelData); // array of Float32Arrays

    // wav.encode(result.channelData, {
    //   sampleRate: result.sampleRate,
    //   float: true,
    //   bitDepth: 32
    // });

    // const encoder = new Lame({
    //   output: "./record.mp3",
    //   bitrate: 16,
    //   sfreq: 16
    // }).setFile("./record.wav");

    // encoder
    //   .encode()
    //   .then(() => {
    //     // Encoding finished
    //     console.log('encoding done');
    //   })
    //   .catch(error => {
    //     // Something went wrong
    //     console.log('encoding big F: ', error);
    //   });

    const decoder = new Lame({
      output: "./record.wav"
    }).setFile("./record.mp3");

    decoder
      .decode()
      .then(() => {
        // Decoding finished
        console.log("decoding success");
      })
      .catch(error => {
        // Something went wrong
        console.log("decoding big OOF: ", error);
      });

    // speechToText();
    http.get('http://localhost:3000', response => {
      console.log('response from azure: ', response);
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