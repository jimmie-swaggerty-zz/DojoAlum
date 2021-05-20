const express = require("express");
const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
// mongoose is how you talk to mongodb
require('./config/mongoose.config');
// put your routes here
require('./routes/dojoalum.route')(app);

app.listen(port, () => console.log(`Project Group, you ROCK! You have connected to port: ${port} \n\n`));