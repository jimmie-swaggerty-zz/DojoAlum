require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');
const cookieParser = require("cookie-parser");
const port = process.env.MY_PORT;

//require config file, talk to mongoose and jsonweb
require('./config/mongoose.config');
require('./config/jwt.config');

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// mongoose is how you talk to mongodb
require('./config/mongoose.config');

// put your routes here
require('./routes/post.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Project Group, you ROCK! You have connected to port: ${port} \n\n`));