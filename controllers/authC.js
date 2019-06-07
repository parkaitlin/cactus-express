const User = require('../models/user');

module.exports = {
    newAccount: async (req, res)=>{
        if(req.body.password == req.body.confirmPassword){
            try{
                const newUser = await User.create(req.body);
                req.session.userDbId = newUser._id;
                res.json({
                    status: 200,
                    created: true,
                    message: 'Account created. Welcome to The Cactus Tour!',
                    user: newUser
                })
            } catch (error){
                res.json({
                    error: error
                })
            }
        } else {
            res.json({
                message: 'passwords do not match.'
            })
        }
    },
    index: async (req, res)=>{
        try {
            const users = await User.find({})
            res.json({
                status: 200,
                users: users
            })
        } catch (error) {
            res.json({
                error: error
            })
        }
    },
    authorize: async (req, res)=>{
        try {
            const foundUser = await User.findOne({email: req.body.email})
            if(foundUser.validPassword(req.body.password)){
                req.session.message = 'login successful';
                req.session.userDbId = foundUser._id;

                res.json({
                    status: 200,
                    verified: true,
                    user: foundUser,
                    session: req.session
                })
            } else {
                req.session.message = 'Unfortunately the login information provided, does not match our records. Please try again.'
                res.json({
                    data: 'invalid password',
                    message: req.session.message
                })
            }
        } catch (error) {
            req.session.message = 'Unfortunately the login information provided, does not match our records. Please try again.'
            res.json({
                error: error,
                message: req.session.message
            })
        }
    },
    logout: async (req, res)=>{
        try {
            req.session.destroy
            res.json({
                messaged: 'You have successfully logged out.'
            })
        } catch (error){
            res.json({
                error: error
            })
        }
    }
}