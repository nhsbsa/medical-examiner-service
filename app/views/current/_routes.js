// External dependencies
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// location of death
router.post(/location-of-death/, (req, res) => {

    const locationOfDeath = req.session.data['locationOfDeathType']

    if (locationOfDeath == 'hospital-acute') {
        res.redirect('hospital-acute-setting')
    } else {
        res.redirect('community-non-acute')
    }

})

// Discussion with the attending practitioner about the cause of death
router.post(/ap-prop-cod-discussion/, (req, res) => {

    const needDiscussion = req.session.data['ap-prop-cod-discussion']

    if (needDiscussion == 'yes') {
        res.redirect('record-discussion-ap')
    } else {
        res.redirect('no-discussion-ap')
    }

})

// Notification method
router.post(/notification-method/, (req, res) => {

    const usingServiceToNotiftyCoroner = req.session.data['internalNotification']

    if (usingServiceToNotiftyCoroner == 'yes') {
        res.redirect('me-comms-coroner')
    } else {
        res.redirect('notification-details')
    }

})


module.exports = router;
