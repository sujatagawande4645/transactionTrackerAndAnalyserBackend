const Transaction = require("../models/seedDataModels");
const getTransactions = async (request, response) => {
  try {
    const { page = 1, perPage = 10, search = "" } = request.query;
    const pageNum = parseInt(page);
    const perPageNum = parseInt(perPage);
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: { $regex: search, $options: "i" } },
        ],
      };
    }

    const totalRecords = await Transaction.countDocuments(searchQuery);
    const transactions = await Transaction.find(searchQuery)
      .skip((pageNum - 1) * perPageNum)
      .limit(perPageNum);

    response.status(200).json({
      page: pageNum,
      perPage: perPageNum,
      totalRecords,
      totalPages: Math.ceil(totalRecords / perPageNum),
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getTransactions };
