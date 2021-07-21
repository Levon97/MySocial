const router = require('express').Router();
const verifyToken = require('../middlewares/validateToken');

router.use(verifyToken);
// router.get