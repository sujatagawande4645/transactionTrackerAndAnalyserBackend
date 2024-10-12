const axios = require("axios");
const Transaction = require("../models/seedDataModels");

const getSeedData = async (request, response) => {
  try {
    // const data = request.body.flag;
    const data = true;
    const amazonUrl =
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

    if (data) {
      const apiResponse = await axios.get(amazonUrl);
      const fetchedData = apiResponse.data;
      await Transaction.insertMany(fetchedData);
    } else {
    }
  } catch (error) {
    console.error("Error in getSeedData:", error);
  }
};

module.exports = { getSeedData };
