const express = require('express');
const router = express.Router();
const controller = require('../controllers/tourC');

router.post('/new', controller.addTour);
router.get('/all', controller.index);
router.put('/:id', controller.update);
router.get('/registration/:id', controller.playerRegistration);
router.get('/upcoming', controller.upcomingTours);

module.exports = router;