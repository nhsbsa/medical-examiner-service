// External dependencies
const express = require('express');
const router = express.Router();

// Current version routes file - matching as close as possible to live
router.use('/current', require('./views/current/_routes'));

// =======================================
// Version Routes Files Below
// =======================================

router.use('/v13', require('./views/v13/_routes'));



module.exports = router;
