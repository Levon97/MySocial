const User = require('../models/user');

//searching by name lastName and age in predefined fields
async function searchUser(req, res) {
    const searchedName = await req.body.name;
    const searchedLastName = await req.body.lastName;
    const searchedAge = await req.body.age;
    try {
        const user = await User.filte;
        const users = user.filter(x => {
            if (x.name.toLowerCase()===searchedName.toLowerCase()|| searchedName === null){
                if (x.lastName.toLowerCase()===searchedLastName.toLowerCase()|| searchedLastName === null){
                    if (x.searchedAge==searchedAge|| searchedAge === null){
                        return true;
                    }       
                }
            }

        return false;     
        })
        if(users.length==0){
            return res.status(404).json({error:"user not found"})
        }
         res.json({ data: users })
    } catch (error) {
        console.error()
        res.status(400).json({ error });
    }

}

// friend request
async function friendRequest(req,res){
   try{
        const userId = await req.user._id;
        const toUserId = await req.params.id
        const reqDocA = await Friend.findOneAndUpdate(
            { requester: userId, recipient: toUserId },
            { $set: { status: 1 }},
            { upsert: true, new: true }
        )
        const resDocB = await Friend.findOneAndUpdate(
            { recipient: userId, requester: toUserId },
            { $set: { status: 2 }},
            { upsert: true, new: true }
        )
        const updateUserA = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { friends: reqDocA._id }}
        )
        const updateUserB = await User.findOneAndUpdate(
            { _id: toUserId },
            { $push: { friends: resDocB._id }}
        )} 

   catch (error) {
        console.error()
        res.status(400).json({ error });
    }
}

// accepting friend request by id 
async function acceptFriendReq(req,res){
    try {
        const userId = await req.user._id;
        const fromUserId = await req.params.id
    
        await Friend.findOneAndUpdate(
            { requester: fromUserId, recipient: userId },
            { $set: { status: 3 }}
        )
        await Friend.findOneAndUpdate(
            { recipient: fromUserId, requester: userId },
            { $set: { status: 3 }}
        )
    } catch (error) {
        console.error()
        res.status(400).json({ error });
    } 
}

// declining friend request  when  user loged in
async function declineFriendReq(req,res){
    try {
        const userId = await req.user._id;
        const fromUserId = await req.params.id
    
        const reqdocA = await Friend.findOneAndRemove(
            { requester: fromUserId, recipient: userId }
        )
        const resdocB = await Friend.findOneAndRemove(
            { recipient: fromUserId, requester: userId }
        )
        const updatefromUser = await User.findOneAndUpdate(
            { _id: fromUserId },
            { $pull: { friends: reqdocA._id }}
        )
        const updateUser = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: reqDocB._id }}
        )

    } catch (error) {
        console.error()
        res.status(400).json({ error });
    }
}

module.exports = {
    searchUser,
    friendRequest,
    acceptFriendReq,
    declineFriendReq
}