const express = require('express');
const router = express.Router();
const controller = require('../controllers/authC');

router.post('/new', controller.newAccount);

module.exports = router;