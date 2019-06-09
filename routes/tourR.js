const express = require('express');
const router = express.Router();
const controller = require('../controllers/tourC');

router.post('/new', controller.addTour);
router.get('/all', controller.index);

module.exports = router;