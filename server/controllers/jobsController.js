const Job = require("../models/Job")


// CREATE a Job
//---------------------------------------------------------------------
const createJob = async (req, res) => {
    const { position, company } = req.body
    
    if (!position || !company) {
        res.status(400).json("Please provide all values")
    }
    
    // userId comes from auth middleware
    req.body.createdBy = req.userId
    
    const job = await Job.create(req.body)
    res.status(201).json({ job })
}


// DELETE a Job
//---------------------------------------------------------------------
const deleteJob = (req, res) => {
    res.json({job: "Delete a Job" })
}

// GET ALL Jobs
//---------------------------------------------------------------------
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({createdBy:req.userId})
        res.json(jobs)
    } catch (error) {
        console.log(error);   
    }
}

// UPDATE Job
//---------------------------------------------------------------------
const updateJob = (req, res) => {
    res.json({job: "Update a Job" })
}


const showStats = (req, res) => {
    res.json({job: "Show stats" })
}


module.exports = { createJob, deleteJob, getAllJobs, updateJob, showStats }