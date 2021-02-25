const { Router } = require('express');
const passport = require('passport')
const { createMessage, deleteMessage, fetchMessages } = require('../controllers/messages.controller');

const router = Router();

// Message
// /api/v1/message/create
router.post('/create', passport.authenticate('jwt', { session: false }), createMessage);
// /api/v1/message/delete/id
router.post('/delete', passport.authenticate('jwt', { session: false }), deleteMessage);
// /api/v1/message/fetch
router.get('/fetch', passport.authenticate('jwt', { session: false }), fetchMessages);

module.exports = router;
