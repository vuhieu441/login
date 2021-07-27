const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
mongoose.connection.on("error", () => {
    console.log("Mongoose Connection ERROR: " + err.message);
  });
  mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
  });
