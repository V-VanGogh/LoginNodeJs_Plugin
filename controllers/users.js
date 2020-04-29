const User = require('../models/user');

module.exports = {
    signUp: async (req, res, next) => {
        console.log('UserController.signUp() called');
        const {email, password}  = req.value.body;

        const  foundUser = await User.findOne({email});
        if (foundUser) {
           return res.status(403).json({error: ' Email is already in use'})
        }


        const newUser = new User({email,password});
        await newUser.save();

        res.json({user: 'created'});

    },
    signIn: async (req, res, next) => {
        console.log('UserController.signIn() called');
    },
    secret: async (req, res, next) => {
        console.log('UserController.secret() called');
    }
};