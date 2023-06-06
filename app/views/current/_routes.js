// External dependencies
const e = require('express');
const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line

// ========================================================================
// CREATE NEW CASE
// ========================================================================

// Deceased person's details
router.post(/create-new-case/, (req, res) => {

    res.redirect('assign-case')

})

// Assign someone to case
router.post(/assign-case-to-someone/, (req, res) => {

    req.session.data['create-and-assign-section'] = 'complete'
    res.redirect('case/case-details')

})

// ========================================================================
// CASE DETAILS
// ========================================================================

// Additional details
router.post(/additional-details/, (req, res) => {

    // creating a session key 'additional-details-section' and assigning it the value of complete
    req.session.data['additional-details-section'] = 'complete'

    res.redirect('case-details')

})

// location of death
router.post(/location-of-death/, (req, res) => {

    const locationOfDeath = req.session.data['locationOfDeathType']

    if (locationOfDeath == 'hospital-acute') {
        res.redirect('hospital-acute-setting')
    } else {
        res.redirect('community-non-acute')
    }

})

// Hospital or acute setting
router.post(/hospital-acute-setting/, (req, res) => {

    // creating a session key 'additional-details-section' and assigning it the value of complete
    req.session.data['location-of-death-section'] = 'complete'
    
    res.redirect('case-details')

})

// Community or non-acute setting
router.post(/community-non-acute/, (req, res) => {

    // creating a session key 'additional-details-section' and assigning it the value of complete
    req.session.data['location-of-death-section'] = 'complete'
    
    res.redirect('case-details')

})

// ========================================================================
// CASE SCRUTINY
// ========================================================================

// Add a note
router.post(/pre-scrutiny-note/, (req, res) => {

    const sectionComplete = req.session.data['sectionComplete']

    if (sectionComplete) {
        req.session.data['pre-scrutiny-note-section'] = 'complete'
        res.redirect('case-scrutiny')
    } else {
        req.session.data['pre-scrutiny-note-section'] = 'incomplete'
        res.redirect('case-scrutiny')
    }
    

})

// Record proposed cause of death
router.post(/ap-prop-cause-of-death/, (req, res) => {

    const declaration1 = req.session.data['declaration1']
    const declaration2 = req.session.data['declaration2']

    if (declaration1 && declaration2) {
        req.session.data['ap-prop-cause-of-death-section'] = 'complete'
        res.redirect('case-scrutiny')
    } else {
        req.session.data['ap-prop-cause-of-death-section'] = 'incomplete'
        res.redirect('case-scrutiny')
    }
    
})

// Record review
router.post(/record-review/, (req, res) => {

    const declaration = req.session.data['reviewConfirmed']

    if (declaration) {
        req.session.data['me-independent-review-section'] = 'complete'
        res.redirect('case-scrutiny')
    } else {
        req.session.data['me-independent-review-section'] = 'incomplete'
        res.redirect('case-scrutiny')
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

// Record discussion
router.post(/record-discussion-ap/, (req, res) => {

    const agreedOutcome = req.session.data['agreedOutcome']

    if (agreedOutcome) {
        req.session.data['ap-discussion-section'] = 'complete'
    } else {
        req.session.data['ap-discussion-section'] = 'incomplete'
    }

    res.redirect('case-scrutiny')
    

})

// Discussion with the attending practitioner about the cause of death
router.post(/no-discussion-ap/, (req, res) => {

    const noDiscussionReason = req.session.data['reasonForNonDiscussion']
    const noDiscussionDeclaration = req.session.data['satisfiedWithQAPCauseOfDeath']

    if (noDiscussionDeclaration) {
        req.session.data['ap-discussion-section'] = 'complete'
    } else {
        req.session.data['ap-discussion-section'] = 'incomplete'
    }

    res.redirect('case-scrutiny')
    

})



// ========================================================================
// COMMUNICATION AND CONCERNS
// ========================================================================

// Has there been a discussion with the main contact about the cause of death?
router.post(/discussion-with-main/, (req, res) => {

    const discussionWithMain = req.session.data['discussionWithMain']

    if (discussionWithMain == 'yes') {
        res.redirect('discussion-with-main-contact')
    } else {
        res.redirect('no-discussion-main')
    }

})

// No discussion
router.post(/no-discussion-main/, (req, res) => {

    req.session.data['discussion-with-main-section'] = 'complete'
    res.redirect('no-discussion-main-cya')

})

// Record discussion
router.post(/main-contact-discussion/, (req, res) => {

    const raiseConcern = req.session.data['recordAsConcernMain']
    req.session.data['discussion-with-main-section'] = 'complete'

    if (raiseConcern == 'yes') {
        res.redirect('main-raise-concern')
    } else {
        res.redirect('discussion-main-cya')
    }
    
})

// Record concern
router.post(/main-raise-concern/, (req, res) => {
    
    req.session.data['recordAsConcernMain'] = 'yes'
    res.redirect('discussion-main-cya')
    
})

// Record communication or a concern
router.post(/record-comm-or-concern/, (req, res) => {
    
    const recordCommsConcern = req.session.data['recordAsCommsConcern']
    req.session.data['record-communication-concern-section'] = 'complete'
    
    if (recordCommsConcern == 'yes') {
        res.redirect('raise-comms-concern')
    } else {
        res.redirect('discussion-main-cya')
    }
    
})

// Record concern (coming from Communication or concern)
router.post(/raise-comms-concern/, (req, res) => {
    
    req.session.data['recordAsConcernComms'] = 'yes'
    res.redirect('comms-concern-cya')
    
})

// ========================================================================
// CORONER NOTIFICATION
// ========================================================================

// Notification method
router.post(/notification-method/, (req, res) => {

    const usingServiceToNotiftyCoroner = req.session.data['internalNotification']
    req.session.data['notify-coroner'] = 'yes'

    if (usingServiceToNotiftyCoroner == 'yes') {
        req.session.data['using-service-notify-coroner'] = 'yes'
        res.redirect('me-comms-coroner')
    } else {
        req.session.data['using-service-notify-coroner'] = 'no'
        res.redirect('notification-details')
    }

})

// Notification details (method: No)
router.post(/notification-details/, (req, res) => {

    req.session.data['coroner-notification-section'] = 'complete' 
    res.redirect('coroner-notification')

})

// ME communication to the coroner
router.post(/me-comms-coroner/, (req, res) => {

    res.redirect('coroner-email')

})

// Coroner's email address
router.post(/coroner-email/, (req, res) => {
    
    req.session.data['coroner-notification-section'] = 'complete'
    res.redirect('coroner-email-cya')

})

// Coroner's email address
router.post(/coroner-response/, (req, res) => {

    req.session.data['coroner-response-section'] = 'complete'
    res.redirect('coroner-notification')

})

// ========================================================================
// CLOSE CASE
// ========================================================================

// Close case
router.post(/close-case/, (req, res) => {

    const caseClosed = req.session.data['closeCase']

    if (caseClosed == 'yes') {
        req.session.data['close-case'] = 'yes'
        res.redirect('close-case-confirmed')
    } else {
        req.session.data['close-case'] = 'no'
        res.redirect('case-details')
    }

})

// ========================================================================
// REOPEN CASE
// ========================================================================

// Reopen case
router.post(/reopen-case/, (req, res) => {

    const deceasedFullName = req.session.data['deceased-full-name']

    if (deceasedFullName == 'Kia Ravi') {
        req.session.data['reopen-this-case'] = 'yes'
    } else {
        req.session.data['reopen-this-case'] = 'no'
    }

    res.redirect('case-details');

})


module.exports = router;
