const launchesDB = require("./launches.schema");
const planetsSchema = require("./planets.schema");

let DEFAUT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2025"),
  target: "Kepler-1410 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunches(launch);

async function getAllLaunches() {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
}

async function saveLaunches(launch) {
  const planetName = await planetsSchema.findOne({ keplerName: launch.target });
  if (!planetName) {
    throw new Error("No planet found");
  }
  await launchesDB.updateOne({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
}

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getLaunchNumber() {
  const latestLanuch = await launchesDB.findOne().sort("-flightNumber");
  if (!latestLanuch) {
    return DEFAUT_FLIGHT_NUMBER;
  }
  return latestLanuch.flightNumber;
}
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLaunchNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });
  return await saveLaunches(newLaunch);
}

function abortLaunnchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  existLaunchWithId,
  scheduleNewLaunch,
  abortLaunnchById,
};
