/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */
import axios from 'axios';


Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
  }
});

export async function run() {

  // Get a reference to the current message
  const item = Office.context.mailbox.item;

 // Get the plain text content of the email body
  item.body.getAsync(Office.CoercionType.Text, (result) => {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      const emailContent = result.value; //emailContent is a string value

      // Make a POST request to your Flask API
      
      axios.post("http://127.0.0.1:5001/predict", { "input_data": emailContent }, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (!response.status === 200) {
          // Handle non-200 status code
          throw new Error("Request failed with status: " + response.status);
        }
        return response.data;
      })
      .then((prediction) => {
        // Update the task pane with the prediction result
        document.getElementById("item-subject").innerHTML =
          "<b>Subject:</b> <br/>" + item.subject;
        document.getElementById("item-prediction").innerHTML =
          "<b>Prediction:</b> <br/>" + prediction;
      })
      .catch((error) => {
        // Handle any error that occurred during the POST request
        // Show an error message in the task pane
        document.getElementById("error-message").innerHTML = error.message;
        document.getElementById("error-message").style.display = "block";
      });

    } else {
      // Handle any error that occurred while retrieving the email content
      // Show an error message in the task pane
      document.getElementById("error-message").innerText = "Error: Unable to retrieve email content.";
      document.getElementById("error-message").style.display = "block";
    }
  });
}

// function preprocess(emailContent) {
//   // Add code to preprocess the email item and extract relevant features
//   // Preprocessing steps may include converting text data to numerical representations, etc.
//   // Return the processed input features as an array or object

//   // Check if emailContent is not empty
//   if (!emailContent) {
//     return null; // Return null if email content is empty
//   }


//   // Preprocess the email content
//   let email = emailContent.toLowerCase(); // Convert to lowercase
//   email = email.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic characters
//   const words = email.split(' '); // Tokenize the text into words

//  // Apply stemming by removing common suffixes
//   const stemmedWords = words.map((word) => {
//     // Apply your own stemming rules here
//     // For a simple example, you can just remove "s" and "ing" suffixes
//     return word.replace(/s$/, '').replace(/ing$/, '');
//   });

//   // Remove stop words
//   const stopWords = new Set([
//     "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has",
//     "he", "in", "is", "it", "its", "of", "on", "that", "the", "to", "was",
//     "were", "will", "with"
//   ]);  
//   const filteredWords = stemmedWords.filter((word) => !stopWords.has(word));

//   // Combine the processed words back into a string
//   const processedEmail = filteredWords.join(' ');

//   // Return the processed email content as an array (this might vary based on your model's input format)
//   return [processedEmail];

// }

// async function loadModel() {
//   const modelFile = 'models/model.onnx';
//   try{
//     //Fetch the model file
//     const response = await fetch(modelFile);
//     const buffer = await response.arrayBuffer();
//     const model = new onnx.InferenceSession(new Uint8Array(buffer));
//     return model;
//   } catch (error){
//      document.getElementById("sideload-msg").style.display = "flex";
//      document.getElementById("sideload-msg").innerText = error;
//   }
// }

