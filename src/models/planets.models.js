const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");
const planet = require("./planets.schema");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler-data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          // habitablePlanets.push(data);
          await savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const planets = (await getAllPlanets()).length;
        console.log(`${planets} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planet.find({});
}
async function savePlanet(data) {
  await planet.updateOne(
    { keplerName: data.kepler_name },
    {
      keplerName: data.kepler_name,
    },
    {
      upsert: true,
    }
  );
}
module.exports = {
  loadPlanetData,
  getAllPlanets,
};
