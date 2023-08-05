// testFetch.js

// test.js
const axios = require('axios');

async function testFetch() {
  const url = "http://127.0.0.1:5001/predict";
  const data = { "input_data": "This is a sample email" };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Request failed with error:", error.message);
  }
}

// Call the function to test the fetch request
testFetch();
