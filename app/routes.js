// External dependencies
const express = require('express');
const router = express.Router();

// clear session data - link in footer
router.post('/clear-session-data/', (req, res) => {
    req.session.data = {}
    res.render('index')
})

// Current version routes file - matching as close as possible to live
router.use('/current', require('./views/current/_routes'));

// =======================================
// Version Routes Files Below
// =======================================

router.use('/v13', require('./views/v13/_routes'));
router.use('/v14', require('./views/v14/_routes'));
router.use('/v15', require('./views/v15/_routes'));
router.use('/v16', require('./views/v16/_routes'));
router.use('/v17', require('./views/v17/_routes'));
router.use('/v18', require('./views/v18/_routes'));
router.use('/v19', require('./views/v19/_routes'));

module.exports = router;
