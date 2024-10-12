const router = require("express").Router();
const { getTransactions } = require("../controllers/transactionsController");

router.get("/", getTransactions);

module.exports = router;
