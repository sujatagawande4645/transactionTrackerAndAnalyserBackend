const Transaction = require("../models/seedDataModels");
const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ error: "Invalid or missing month parameter" });
    }

    const monthNumber = parseInt(month);

    const transactions = await Transaction.find({
      $expr: {
          $eq: [{ $month: "$dateOfSale" },month] // 11 for November
      }
  });

    const categoryCountMap = {};

    transactions.forEach((transaction) => {
      const category = transaction.category;
      if (categoryCountMap[category]) {
        categoryCountMap[category] += 1;
      } else {
        categoryCountMap[category] = 1;
      }
    });

    const pieChartData = Object.entries(categoryCountMap).map(
      ([category, count]) => ({
        category,
        count,
      })
    );

    return res.status(200).json({
      month: monthNumber,
      categories: pieChartData,
    });
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getPieChartData };
