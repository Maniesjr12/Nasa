const mongoose = require("mongoose");
const Mongo = process.env.MONGO_URL;

async function mongooseConnect() {
  await mongoose.connect(Mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.connection.once("open", () => {
  console.log("MongoDB connection Established");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongooseDisconnect() {
  await mongoose.disconnect();
}
module.exports = {
  mongooseConnect,
  mongooseDisconnect,
};
