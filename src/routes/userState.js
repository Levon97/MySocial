const router = require('express').Router();
const verifyToken = require('../middlewares/validateToken');
const {
    searchUser,
    friendRequest,
    acceptFriendReq,
    declineFriendReq
} = require('../controllers/userController');

router.use(verifyToken);
router.get('/user/search',searchUser);
router.put('/user/addFriend/:id',friendRequest);
router.put('/user/acceptRequest/:id',acceptFriendReq);
router.put('/user/declineRequest/:id',declineFriendReq);
module.exports = router;