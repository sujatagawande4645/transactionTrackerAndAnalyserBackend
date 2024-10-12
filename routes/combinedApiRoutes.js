const router = require("express").Router();
const { getCombinedData } = require("../controllers/combinedApiController");

router.get("/", getCombinedData);

module.exports = router;
