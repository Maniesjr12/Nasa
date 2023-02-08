const PORT = 8000 || process.env.PORT;

//   "mongodb+srv://<username>:<password>@cluster0.afqpx.mongodb.net/?retryWrites=true&w=majority"
const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.models");
const { mongooseConnect } = require("./services/mongodb");
const { getLauchesData } = require("./models/launch.model");

const server = http.createServer(app);

async function loadServer() {
  await mongooseConnect();
  await loadPlanetData();
  await getLauchesData();

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

loadServer();
