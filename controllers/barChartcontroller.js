const Transaction = require("../models/seedDataModels");

const getBarChart = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || month < 1 || month > 12) {
      return res.status(400).json({ error: "Invalid or missing month parameter" });
    }

    const monthNumber = parseInt(month);

    // Fetch transactions where the month of the dateOfSale matches the monthNumber
    const transactions = await Transaction.find({
      $expr: {
          $eq: [{ $month: "$dateOfSale" },month] // 11 for November
      }
  });

    // Define price ranges
    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    // Count transactions in each price range
    transactions.forEach((transaction) => {
      const price = parseFloat(transaction.price);

      if (price >= 0 && price <= 100) priceRanges["0-100"] += 1;
      else if (price >= 101 && price <= 200) priceRanges["101-200"] += 1;
      else if (price >= 201 && price <= 300) priceRanges["201-300"] += 1;
      else if (price >= 301 && price <= 400) priceRanges["301-400"] += 1;
      else if (price >= 401 && price <= 500) priceRanges["401-500"] += 1;
      else if (price >= 501 && price <= 600) priceRanges["501-600"] += 1;
      else if (price >= 601 && price <= 700) priceRanges["601-700"] += 1;
      else if (price >= 701 && price <= 800) priceRanges["701-800"] += 1;
      else if (price >= 801 && price <= 900) priceRanges["801-900"] += 1;
      else priceRanges["901-above"] += 1;
    });

    return res.status(200).json({
      month: monthNumber,
      priceRanges,
    });
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getBarChart };
