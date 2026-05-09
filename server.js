//DISCLAMER: This part of the code was heavily AI reliant on what was needed. While it was typed out by hand, it was mostly controlled by AI.


//Import libraries
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');

// Creates an app object. Used for:
// app.get() — a way to handle GET requests
// app.post() — a way to handle POST requests
// app.listen() — a way to start the server
// app.use() — a way to add middleware
//DISCLAMER: This comment used AI in its creation
const app = express()
const PORT = 3000

//Middleware:
//Transforms the text into JSON
//Makes 'public' the only folder sent to the website
app.use(express.json());
app.use(express.static('public'));

//Sets the ratelimit for requests. Can send 5 request in 15 minutes
//Express-rate-limit documentation https://www.npmjs.com/package/express-rate-limit
const limiter = rateLimit({
    windowMs: 1 * 60 * 60 * 1000, //1 hour
    max: 5
})
//Attaches the limiter to /submit-issue route
app.use('/submit-issue', limiter);

//Listens and recives the POST request. Then executes the code inside the function
//The code send three different types of information. The fact that it is a POST request, the github token aswell as the content type, the issue data
app.post('/submit-issue', async function (req, res) {
    const { title, body } = req.body;
    const response = await fetch('https://api.github.com/repos/Kroaxys/Website-To-Repo/issues', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': `application/json` },
        body: JSON.stringify({ title, body })
    })
    if (response.ok) {
        res.json({ success: true });
    }
    else { res.status(500).json({ success: false }) }
})

//Makes the code listen for requests
app.listen(PORT, function(){console.log("Started")});