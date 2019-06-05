const User = require('../models/user');

module.exports = {
    newAccount: async (req, res)=>{
        try{
            const newUser = await User.create(req.body);
            res.json({
                status: 200,
                message: 'Account created. Welcome to The Cactus Tour!',
                user: newUser
            })
        } catch (error){
            res.json({
                error: error
            })
        }
    }
}