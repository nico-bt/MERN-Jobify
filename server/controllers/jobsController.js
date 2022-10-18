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


// GET ALL Jobs
//---------------------------------------------------------------------
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({createdBy:req.userId})
        res.json({jobs})
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

// UPDATE Job
//---------------------------------------------------------------------
const updateJob = async (req, res) => {
    const jobId = req.params.id

    const {company, position} = req.body
    if(!company || !position) {
        return res.status(400).json({msg: "Enter company and position please"})
    }
    
    try {
        const job = await Job.findOne({ _id: jobId })
        
        if(!job) {
            return res.status(400).json({msg: "No job with the provided id"})
        }

        // Check permission
        if(req.userId.toString() !== job.createdBy.toString()) {
            return res.status(401).json({ msg: "This is NOT your item to update" })
        }

        const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body, {new: true, runValidators: true})
        res.json({ updatedJob })
    } catch (error) {
        res.json({msg: error.message})
    }
}

// DELETE a Job
//---------------------------------------------------------------------
const deleteJob = async (req, res) => {
    const jobId = req.params.id

    try {
        const job = await Job.findOne({ _id: jobId })
        
        if(!job) {
            return res.status(400).json({msg: "No job with the provided id"})
        }

        // Check permission
        if(req.userId.toString() !== job.createdBy.toString()) {
            return res.status(401).json({ msg: "This is NOT your item to delete" })
        }

        const deletedJob = await Job.findByIdAndDelete(jobId)
        res.json({ deletedJob})
    } catch (error) {
        res.json({msg: error.message})
    }
}


const showStats = (req, res) => {
    res.json({job: "Show stats" })
}


module.exports = { createJob, deleteJob, getAllJobs, updateJob, showStats }