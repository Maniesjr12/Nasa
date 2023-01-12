const {getAllLaunches, createNewLaunch} = require('../../models/launch.model')

function httpGetAllLaunches(req, res){

    res.status(200).json(getAllLaunches())

}


function httpAddNewLaunch(req, res){
    const launch = req.body

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target ){
        return res.status(400).json({
            error: "Missing required launch property"
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: "invalid date property property"
        })
    }

    createNewLaunch(launch)
    res.status(201).json(launch)
}


module.exports ={
    httpGetAllLaunches,
    httpAddNewLaunch
}