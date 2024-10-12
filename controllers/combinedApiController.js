const { getBarChart } = require("./barChartcontroller");
const { getPieChartData } = require("./pieChartController");
const { getStatisticsdata } = require("./statisticsController");

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ error: "Invalid or missing month parameter" });
    }

    const [barChartResponse, pieChartResponse, statisticsResponse] =
      await Promise.all([
        new Promise((resolve, reject) => {
          getBarChart(req, {
            status: (code) => ({ json: resolve }),
            json: resolve,
            statusCode: 200,
          });
        }),
        new Promise((resolve, reject) => {
          getPieChartData(req, {
            status: (code) => ({ json: resolve }),
            json: resolve,
            statusCode: 200,
          });
        }),
        new Promise((resolve, reject) => {
          getStatisticsdata(req, {
            status: (code) => ({ json: resolve }),
            json: resolve,
            statusCode: 200,
          });
        }),
      ]);

    const combinedData = {
      barChart: barChartResponse,
      pieChart: pieChartResponse,
      statistics: statisticsResponse,
    };

    return res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCombinedData };
