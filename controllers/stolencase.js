const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const StolenCase = require('../models/StolenCase');
const Police = require('../models/Police');

const addStolenCase = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, ownerName, registration, description, color } = req.body;

  let assigneeId;
  let police;
  try {
    police = await Police.findOne({ status: 'Available' });

    if (police) {
      assigneeId = police._id;
    }
  } catch (err) {
    return res.status(404).json({
      message: 'Something went wrong, case did not register',
    });
  }

  const stolenCase = new StolenCase({
    name,
    ownerName,
    registration,
    description,
    color,
  });

  if (police) {
    stolenCase.assignee = police;

    police.status = 'Busy';
    police.caseHandling = stolenCase;
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await stolenCase.save({ session: sess });
    if (police) {
      await police.save({ session: sess });
    }
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .json({ message: 'Case can not be registered, try after some time' });
  }

  res.status(201).json({
    stolenCase,
    police,
    message: 'Stolen case registered successfully',
  });
};

const resolveStolenCase = async (req, res, next) => {
  const caseId = req.params.cid;

  let stolenCase;
  try {
    stolenCase = await StolenCase.findById(caseId);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, could not update the case !!!' });
  }

  let police;
  try {
    police = await Police.findById({ _id: stolenCase.assignee });

    police.status = 'Available';
    police.caseHandling = undefined;
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, could not update the case' });
  }

  stolenCase.isPending = false;
  stolenCase.isResolved = true;
  stolenCase.assignee = undefined;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await stolenCase.save({ session: sess });
    await police.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong, could not update the case' });
  }

  res.status(200).json({ stolenCase });
};

const checkCase = async (req, res, next) => {
  const police = await Police.findOne({ status: 'Available' });

  const stolenCase = await StolenCase.findOne({
    $and: [{ isPending: true }, { assignee: null }],
  });

  if (police && stolenCase) {
    stolenCase.assignee = police;

    police.status = 'Busy';
    police.caseHandling = stolenCase;
  } else {
    if (police) {
      return res.status(404).json({ message: 'No case found' });
    } else {
      return res.status(404).json({ message: 'Police is not available' });
    }
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await stolenCase.save({ session: sess });
    await police.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Case can not be registered, try after some time' });
  }

  res.status(200).json({
    stolenCase: stolenCase,
    police: police,
    message: 'Stolen case has been assigned to Police',
  });
};

const getPendingCase = async (req, res, next) => {
  try {
    const stolencases = await StolenCase.find({
      isPending: true,
    }).populate('police', ['name', 'status']);

    if (stolencases) {
      return res.json(stolencases);
    } else {
      return res.status(404).json({ message: 'No pending cases' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error, can not fetch data' });
  }
};

const getResolvedCase = async (req, res) => {
  try {
    const stolencases = await StolenCase.find({
      isResolved: true,
    }).populate('police', ['name', 'status']);

    if (stolencases) {
      return res.json(stolencases);
    } else {
      return res.status(404).json({ message: 'No resolved cases' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error, can not fetch data' });
  }
};

module.exports = {
  addStolenCase,
  getPendingCase,
  getResolvedCase,
  resolveStolenCase,
  checkCase,
};
