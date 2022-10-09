const createJob = (req, res) => {
    res.json("Create a Job");
}

const deleteJob = (req, res) => {
    res.json({job: "Delete a Job" })
}

const getAllJobs = (req, res) => {
    res.json({job: "Get all jobs" })
}

const updateJob = (req, res) => {
    res.json({job: "Update a Job" })
}

const showStats = (req, res) => {
    res.json({job: "Show stats" })
}


module.exports = { createJob, deleteJob, getAllJobs, updateJob, showStats }