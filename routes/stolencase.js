const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  addStolenCase,
  getPendingCase,
  getResolvedCase,
  resolveStolenCase,
  checkCase,
} = require('../controllers/stolencase');

//@route GET api/stolencase/pending
//@description Get pending case
router.get('/pending', getPendingCase);

//@route GET api/stolencase/resolved
//@description Get resolved case
router.get('/resolved', getResolvedCase);

//@route POST api/stolencase
//@description Add case
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('ownerName', 'Car Owner Name is required').not().isEmpty(),
    check('registration', 'Registration number is required').not().isEmpty(),
  ],
  addStolenCase
);

//@route PATCH api/stolencase/:cid
//@description Add case
router.patch('/:cid', resolveStolenCase);

//@route PATCH api/stolencase
//@description Check case and assign police
router.patch('/', checkCase);

module.exports = router;
