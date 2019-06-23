const express = require('express');
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");


const app = express();
// app.use(bodyParser.json({
//   extended: true
// }));
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// replace with your own subscription key,
// service region (e.g., "westus"), and
// the name of the file you want to run
// through the speech recognizer.
const subscriptionKey = "71179d9e20904c6f8317995433c09f9c";
const serviceRegion = "westus"; // e.g., "westus"
const filename = "record.wav"; // 16000 Hz, Mono 16000 Hz, Mono


app.get('/', async (req, res) => { // create the push stream we need for the speech sdk.
  const pushStream = sdk.AudioInputStream.createPushStream();

  // open the file and push it to the push stream.
  fs.createReadStream(filename).on('data', function (arrayBuffer) {
    pushStream.write(arrayBuffer.buffer);
  }).on('end', function () {
    pushStream.close();
  });

  // we are done with the setup
  console.log("Now recognizing from: " + filename);

  // now create the audio-config pointing to our stream and
  // the speech config specifying the language.
  var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
  var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

  // setting the recognition language to English.
  speechConfig.speechRecognitionLanguage = "en-US";

  // create the speech recognizer.
  var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  // start the recognizer and wait for a result.
  recognizer.recognizeOnceAsync(
    function (result) {
      console.log(result);

      recognizer.close();
      recognizer = undefined;
    },
    function (err) {
      console.trace("err - " + err);

      recognizer.close();
      recognizer = undefined;
    });
});

console.log('Azure running on port 3000');
app.listen(3000, '127.0.0.1');