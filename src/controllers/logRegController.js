require('dotenv').config;

const { registrationValidation, loginValidation } = require('../validation');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcrypt');

//Registration with validations of user input data
async function registration(req,res){
    const {error} = registrationValidation(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});
    
    const isEmailExist = await User.findOne({email: req.body.email})
    if(isEmailExist)return res.status(400).json({ error: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password,
        age: req.body.age,
    });
    try{
        const savedUser = await user.save();
        res.json({data: savedUser});

    } catch(error){
        res.status(400).json({error})
        console.log(error);
    }

}

//LogIn with checking token validation and s6tandard validations for user input fields
async function logIn(req, res) {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
   
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: "wrong Email" })
 
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).json({ error: "Password is wrong" });

    const token = jwt.sign(
        { id: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: '2h' }
    );
    res.header("auth-token", token).json({
        error: null,
        data: { token },
    });
}

module.exports = {
    registration,
    logIn
}