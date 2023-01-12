const launches =  new Map()

let currentFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2025'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success:true
}

launches.set(launch.flightNumber, launch)

function getAllLaunches(){
    return Array.from(launches.values())
}

function existLaunchWithId(launchId){
    return launches.has(launchId)
}


function createNewLaunch(launch){
    currentFlightNumber++
    launches.set(currentFlightNumber, Object.assign(launch,{
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: currentFlightNumber
    }))
}

module.exports = {
    getAllLaunches, 
    createNewLaunch,
    existLaunchWithId
}
     
