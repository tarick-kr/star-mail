const { Router } = require('express');
const passport = require('passport');
const { deleteMessage, fetchMessages, fetchMessage } = require('../controllers/messages.controller');
const { sendMessage } = require('../controllers/mail.controller');

const router = Router();

// Message
// /api/v1/message/create
// router.post('/save', passport.authenticate('jwt', { session: false }), saveMessage);
// /api/v1/message/delete/id
router.post('/delete/:messageId', passport.authenticate('jwt', { session: false }), deleteMessage);
// /api/v1/message/fetch/userId
router.get('/fetch-all/:userId', passport.authenticate('jwt', { session: false }), fetchMessages);
// /api/v1/message/fetch/messageId
router.get('/fetch-one/:messageId', passport.authenticate('jwt', { session: false }), fetchMessage);
// /api/v1/message/send
router.post('/send', passport.authenticate('jwt', { session: false }), sendMessage);

module.exports = router;
