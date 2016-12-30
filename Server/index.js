//npm run dev to get server running after setting script "dev": "nodemon index.js"

//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');


//DB setup
//mongoose.connect('mongodb://localhost:auth/auth');
mongoose.connect('mongodb://<peterrkang>:<saewon>@ds119788.mlab.com:19788/locals');


//App setup boilerplate/middleware in express any incoming request is passed through
app.use(morgan('combine'));
app.use(bodyParser.json({ type: '*/*' }));
//used to parse as json regardless of type

router(app);




//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
