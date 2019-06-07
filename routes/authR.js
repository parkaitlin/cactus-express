const express = require('express');
const router = express.Router();
const controller = require('../controllers/authC');

router.get('/', controller.index); //for testing purposes
router.post('/new', controller.newAccount);
router.post('/login', controller.authorize);
router.post('/logout', controller.logout);

module.exports = router;