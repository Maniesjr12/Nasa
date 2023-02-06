const launchesDB = require("./launches.schema");
const planetsSchema = require("./planets.schema");
const axios = require("axios");
let DEFAUT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100, //flight_number
  mission: "Kepler Exploration X", //name
  rocket: "Explorer IS1", //rocket.name
  launchDate: new Date("December 27, 2025"), //date.local
  target: "Kepler-1410 b", //not applicable
  customers: ["ZTM", "NASA"], //payload.customers foreach payload
  upcoming: true, //upcoming
  success: true, //success
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
  await launchesDB.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

async function existLaunchWithId(launchId) {
  const launchWithId = await launchesDB.findOne({ flightNumber: launchId });
  return launchWithId;
}

async function getLaunchNumber() {
  const latestLanuch = await launchesDB.findOne().sort("-flightNumber");
  if (!latestLanuch) {
    return DEFAUT_FLIGHT_NUMBER;
  }
  return latestLanuch.flightNumber;
}
async function scheduleNewLaunch(launchData) {
  const newFlightNumber = (await getLaunchNumber()) + 1;
  const newLaunch = Object.assign(launchData, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunches(newLaunch);
}

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function getLauchesData() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
}

async function abortLaunnchById(launchId) {
  const aborted = await launchesDB.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );
  return aborted;
}

module.exports = {
  getAllLaunches,
  getLauchesData,
  existLaunchWithId,
  scheduleNewLaunch,
  abortLaunnchById,
};
