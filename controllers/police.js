const { validationResult } = require('express-validator');
const Police = require('../models/Police');

const addPolice = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, designation, description } = req.body;

  let existingPolice;
  try {
    existingPolice = await Police.findOne({ name });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Police can not created, try after some time' });
  }

  if (existingPolice) {
    return res
      .status(422)
      .json({ message: 'Police already exists, create another one' });
  }

  const createdPolice = new Police({
    name,
    designation,
    description,
  });

  try {
    await createdPolice.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Police can not created, try after some time' });
  }

  res.status(201).json({
    police: createdPolice,
    message: 'Police created successfully',
  });
};

const getAllPolice = async (req, res, next) => {
  try {
    const allPolice = await Police.find({}).populate('stolencase');

    if (allPolice.length > 0) {
      return res.json(allPolice);
    } else {
      return res.status(404).json({ message: 'No police found' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error, can not fetch data' });
  }
};

module.exports = { addPolice, getAllPolice };
