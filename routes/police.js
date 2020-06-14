const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { addPolice, getAllPolice } = require('../controllers/police');

//@route POST api/police
//@description Add Police
router.post(
  '/',
  [check('name', 'Name field is required').not().isEmpty()],
  [check('designation', 'Designation field is required').not().isEmpty()],
  addPolice
);

//@route GET api/police
//@description Get all police
router.get('/', getAllPolice);

module.exports = router;
