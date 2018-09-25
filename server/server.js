//server with Express

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; //provided by heroku

//search public folder and everything inside
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

//fix path routing
//get all unmatched routes and redirect to index.html
app.get('*', (request, response) => { //req contains info about requests, res allows response manipulation
    response.sendFile(path.join(publicPath, 'index.html'));
});

//start the server
app.listen(port, () => {
    console.log('Server is up!');
});