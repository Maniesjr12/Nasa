const PORT = 8000 || process.env.PORT;
const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.models");

async function loadServer() {
  await loadPlanetData();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

loadServer();
