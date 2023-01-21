const mongoose = require("mongoose");
const MONGO_URL =
  "mongodb+srv://dbUser1:5SNH3q0g7xEa354g@cluster0.afqpx.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection Established");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongooseConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
async function mongooseDisconnect() {
  await mongoose.disconnect();
}
module.exports = {
  mongooseConnect,
  mongooseDisconnect,
};
