const router = require("express").Router();
const { getBarChart } = require("../controllers/barChartcontroller");

router.get("/", getBarChart);

module.exports = router;
