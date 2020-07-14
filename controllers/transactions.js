const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.send(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Post a transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.send(transaction);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).send('Server error');
    }
  }
};

// @desc    Edit a transaction
// @route   PUT /api/v1/transactions/:id
// @access  Public
exports.editTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found',
      });
    } else {
      const updatedTransaction = req.body;
      transaction = await Transaction.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: updatedTransaction },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    console.error(err.message);
    // if (err.kind === 'ObjectId') {
    //   return res.status(404).json({ msg: 'Transaction not found' });
    // }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Transaction not found' });
    } else {
      res.status(500).send('Server error');
    }
  }
};

// @desc    Delete a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found',
      });
    }

    await transaction.remove();
    return res.status(200).json({
      success: true,
      data: 'The transaction was successfully deleted',
    });
  } catch (err) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Transaction not found' });
    } else {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
};
