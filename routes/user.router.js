const express = require('express');
const userCtrl = require('../controllers/user.ctrl');
const passport = require('passport');

const router = express.Router();

router.get('/login', userCtrl.signin);
router.get('/logout', userCtrl.logout);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/login'
}));

module.exports = router;