const { Router } = require('express');
const { createUser, loginUser } = require('../controllers/authUser.controller');

const router = Router();

// User
// /api/auth/createUser
router.post('/createUser', createUser);
// /api/auth/loginUser
router.post('/loginUser', loginUser);

module.exports = router;
