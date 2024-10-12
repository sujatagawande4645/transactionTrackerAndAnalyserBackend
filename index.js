const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectDB } = require("./db");
const transactionRouter = require("./routes/transactionRoutes");
const statisticsRouter = require("./routes/statisticsRoutes");
const barChartRouter = require("./routes/barChartRoutes");
const pieChartRouter = require("./routes/pieChartRoutes");
const getCombinedDataRouter = require("./routes/combinedApiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/transactions", transactionRouter);
app.use("/api/statistics", statisticsRouter);
app.use("/api/getbarchart", barChartRouter);
app.use("/api/getpiechart", pieChartRouter);
app.use("/api/getCombinedData", getCombinedDataRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
