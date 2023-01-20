const PORT = 8000 || process.env.PORT;
const MONGO_URL =
  "mongodb+srv://dbUser1:5SNH3q0g7xEa354g@cluster0.afqpx.mongodb.net/nasa?retryWrites=true&w=majority";
//   "mongodb+srv://<username>:<password>@cluster0.afqpx.mongodb.net/?retryWrites=true&w=majority"
const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.models");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection Established");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function loadServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = http.createServer(app);
  await loadPlanetData();

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

loadServer();
