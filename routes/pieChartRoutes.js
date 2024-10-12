const router = require("express").Router();
const { getPieChartData } = require("../controllers/pieChartController");

router.get("/", getPieChartData);

module.exports = router;
