const express = require("express")
const router = express.Router()

const { getAllJobs, createJob, deleteJob, updateJob, showStats } = require("../controllers/jobsController")


router.route('/').get(getAllJobs)
router.route('/').post(createJob)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob)
router.route('/:id').patch(updateJob)

module.exports = router