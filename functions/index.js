const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')();

exports.chatAPI = functions.https.onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    if (request.method !== "POST") {
        return response.status(400).json({ message: "Invalid request method" });
    }

    try {
        const chatApiResponse = await axios.post("http://api.haji.uno:5000/api/chat", request.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json(chatApiResponse.data);
    } catch (error) {
        console.error('Error:', error);
        return response.json({ message: "Sorry, I couldn't process your message." });
    }
});
