const mongoose = require('mongoose');
const db_name = "dojoalum";

mongoose.connect("mongodb://localhost/" + db_name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`You are now connected to ${db_name} database`))
  .catch((err) => console.log(`You didn't connected to ${db_name}. The error is ${err}`));