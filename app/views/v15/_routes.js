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

// Was the death more than 28 days after birth
router.post(/case-scrutiny-link/, (req, res) => {
    
    req.session.data['runOnce'] = 'yes'
    res.redirect('under-28/28-days')

})

// Was the death more than 28 days after birth
router.post(/28-days/, (req, res) => {
    
    res.redirect('../case-scrutiny')

})

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

// Attending practitioner's (AP) details
router.post(/ap-details/, (req, res) => {

    req.session.data['ap-details-section'] = 'complete'
    res.redirect('case-scrutiny')
    
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

// Outcome of discussion with attending practitioner
router.post(/record-discussion-ap/, (req, res) => {

    const agreedOutcome = req.session.data['record-discussion-ap']

    if (agreedOutcome == 'different-cause-death') {
        res.redirect('different-mccd-outcome')
    } 

    else if (agreedOutcome) {
        req.session.data['ap-discussion-section'] = 'complete'
    } else {
        req.session.data['ap-discussion-section'] = 'incomplete'
    }

    res.redirect('case-scrutiny')
    

})

// Record discussion
router.post(/record-comm-or-concern-ap/, (req, res) => {

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

// Record discussion with main contact
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

// Record discussion
router.post(/record-comm-or-concern/, (req, res) => {
    
    const recordCommsConcern = req.session.data['recordAsCommsConcern']
    req.session.data['record-communication-concern-section'] = 'complete'
    
    if (recordCommsConcern == 'yes') {
        res.redirect('raise-comms-concern')
    } else {
        res.redirect('comms-concern-cya')
    }
    
})

// Record concern (coming from Communication or concern)
router.post(/raise-comms-concern/, (req, res) => {
    
    req.session.data['recordAsConcernComms'] = 'yes'
    res.redirect('concerns-notification-cya')
    
})

// Check concern details 

router.post(/concerns-notification-cya/, (req, res) => {

    req.session.data['concern-raised'] = 'yes'
    
    res.redirect('../case/comms-concerns')

})


router.post(/any-further-action/, (req, res) => {
    res.redirect('comms-concerns')
})

// For comms-concern-cya

router.post(/check-discussion-details/, (req, res) => {

    req.session.data['concern-raised'] = 'yes'
    
    res.redirect('../case/comms-concerns')

})

// ========================================================================
// CORONER NOTIFICATION
// ========================================================================

// Notification method
router.post(/notification-method/, (req, res) => {
    
    const userType = req.session.data['user-type']
    const meCompleted = req.session.data['me-independent-review-section']

    const usingServiceToNotiftyCoroner = req.session.data['internalNotification']
    req.session.data['notify-coroner'] = 'yes'

    if (userType == 'me') {
        if (usingServiceToNotiftyCoroner == 'yes') {
            req.session.data['using-service-notify-coroner'] = 'yes'
            res.redirect('me-comms-coroner')
        } else {
            req.session.data['using-service-notify-coroner'] = 'no'
            res.redirect('notification-details')
        }
    } else if (userType == 'meo' && meCompleted == 'complete') {
        if (usingServiceToNotiftyCoroner == 'yes') {
            req.session.data['using-service-notify-coroner'] = 'yes'
            res.redirect('me-comms-coroner')
        } else {
            req.session.data['using-service-notify-coroner'] = 'no'
            res.redirect('notification-details')
        }
    } else if (userType == 'meo' && usingServiceToNotiftyCoroner == 'no' ){
        res.redirect('notification-details')
    } else {
        res.redirect('cannot-notify-coroner')
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

// ========================================================================
// RESEND OR REMOVE CONCERN NOTIFICATION
// ========================================================================


router.post(/resend-raise-comms-concern/, (req, res) => {

    res.redirect('concerns/comms-concern-cya')

})

router.post(/concerns-notification-resend/, (req, res) => {

    res.redirect('../../statics/comms-concerns')

})

router.post(/remove-concern-notification/, (req, res) => {

    const removeNotification = req.session.data['remove-notification']

    if (removeNotification == 'yes') {
        res.redirect('../concerns/concern-notification-removed')
    } else {
        res.redirect('../../statics/comms-concerns')
    }
    
})

router.post(/remove-discussion-main/, (req, res) => {

    const removeNotification = req.session.data['remove-discussion-main']

    if (removeNotification == 'yes') {
        res.redirect('../concerns/discussion-main-removed')
    } else {
        res.redirect('../comms-concerns')
    }
    
})

router.post(/discussion-main-removed/, (req, res) => {

    res.redirect('../comms-concerns')

})

// ========================================================================
// STATUS REFRESH
// ========================================================================

router.post(/status-refresh/, (req, res) => {

    req.session.data['status-refresh'] = 'complete'

    res.redirect('comms-concerns')

})

// ========================================================================
// SAVE AS DRAFT
// ========================================================================

//Page: /case/additional-details
router.post(/save-draft-AD/, (req, res) => {
    
    req.session.data['draft-status-AD'] = 'draft'

    res.redirect('case-details')

})

//Page: /case/hospital-acute-setting
router.post(/save-draft-HAS/, (req, res) => {
    
    req.session.data['draft-status-HAS'] = 'draft'
    
    res.redirect('case-details')

})

//Page: /case/pre-scrutiny-note
router.post(/save-draft-PSN/, (req, res) => {
    
    req.session.data['draft-status-PSN'] = 'draft'
    
    res.redirect('case-scrutiny')

})

//Page: /case/ap-prop-cause-of-death
router.post(/save-draft-APCOD/, (req, res) => {
    
    req.session.data['draft-status-APCOD'] = 'draft'
    
    res.redirect('case-scrutiny')

})

//Page: /case/different-mccd-outcome
router.post(/save-draft-DIFCOD/, (req, res) => {
    
    req.session.data['draft-status-DIFCOD'] = 'draft'
    
    res.redirect('case-scrutiny')

})

//Page: /case/record-review
router.post(/save-draft-RV/, (req, res) => {
    
    req.session.data['draft-status-RV'] = 'draft'
    
    res.redirect('case-scrutiny')

})

//Page: /case/record-review
router.post(/save-draft-MEIR/, (req, res) => {
    
    req.session.data['draft-status-MEIR'] = 'draft'
    
    res.redirect('case-scrutiny')

})

//Page: /case/record-comm-or-concern
router.post(/save-draft-CC/, (req, res) => {

    req.session.data['draft-status-CC'] = 'draft'

    res.redirect('comms-concerns')

})

//Page: /case/raise-comms-concern
router.post(/save-draft-RC/, (req, res) => {

    req.session.data['draft-status-RC'] = 'draft'

    res.redirect('comms-concerns')

})

//Page: /case/discussion-with-main-contact
router.post(/save-draft-DWMC/, (req, res) => {

    req.session.data['draft-status-DWMC'] = 'draft'

    res.redirect('comms-concerns')

})

module.exports = router;
