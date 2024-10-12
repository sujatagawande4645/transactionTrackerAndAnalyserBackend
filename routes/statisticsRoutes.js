const router = require("express").Router();
const { getStatisticsdata } = require("../controllers/statisticsController");

router.get("/", getStatisticsdata);

module.exports = router;
