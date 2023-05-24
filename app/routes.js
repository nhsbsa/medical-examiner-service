// External dependencies
const express = require('express');
const router = express.Router();

// =======================================
// Version Routes Files Below
// =======================================

router.use('/current', require('./views/current/_routes'));

module.exports = router;
