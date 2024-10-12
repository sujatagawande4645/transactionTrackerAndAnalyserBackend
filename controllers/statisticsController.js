const express = require("express");
const router = express.Router();
const Transaction = require("../models/seedDataModels");
const mongoose = require("mongoose");

const getStatisticsdata = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ error: "Invalid or missing month parameter" });
    }

    const monthNumber = parseInt(month);

    const startOfMonth = new Date(2021, monthNumber - 1, 1);
    const endOfMonth = new Date(2021, monthNumber, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      $expr: {
          $eq: [{ $month: "$dateOfSale" },month] // 11 for November
      }
  });

    let totalSaleAmount = 0;
    let soldItemsCount = 0;
    let unsoldItemsCount = 0;

    transactions.forEach((transaction) => { 
   
      if (transaction.sold) {
        totalSaleAmount += parseFloat(transaction.price);
        soldItemsCount += 1;
      } else {
        unsoldItemsCount += 1;
      }
    });

    res.json({
      month: monthNumber,
      totalSaleAmount: totalSaleAmount.toFixed(2),
      soldItemsCount,
      unsoldItemsCount,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getStatisticsdata };
