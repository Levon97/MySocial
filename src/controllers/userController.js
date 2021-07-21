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

