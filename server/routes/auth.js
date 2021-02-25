const { Router } = require('express');
const { createUser, loginUser } = require('../controllers/auth.controller');

const router = Router();

// User
// /api/v1/auth/create
router.post('/create', createUser);
// /api/v1/auth/login
router.post('/login', loginUser);

module.exports = router;
