const router = require('express').Router();
const { registration,logIn } = require('../controllers/LogRegController');

router.post('/register', registration);
router.post('/login',logIn);

module.exports = router;