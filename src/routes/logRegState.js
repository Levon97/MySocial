const router = require('express').Router();
const { registration,logIn } = require('../controllers/logRegController');

router.post('/register', registration);
router.post('/login',logIn);

module.exports = router;