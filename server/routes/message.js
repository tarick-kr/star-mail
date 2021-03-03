const { Router } = require('express');
const passport = require('passport');
const {
  createMessage, deleteMessage, fetchMessages, fetchMessage,
} = require('../controllers/messages.controller');

const router = Router();

// Message
// /api/v1/message/create
router.post('/create', passport.authenticate('jwt', { session: false }), createMessage);
// /api/v1/message/delete/id
router.post('/delete', passport.authenticate('jwt', { session: false }), deleteMessage);
// /api/v1/message/fetch/userId
router.get('/fetch-all/:userId', passport.authenticate('jwt', { session: false }), fetchMessages);
// /api/v1/message/fetch/messageId
router.get('/fetch-one/:messageId', passport.authenticate('jwt', { session: false }), fetchMessage);

module.exports = router;
