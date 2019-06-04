const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true}, //may not use
    password: {type: String, required: true},
    membership: {type: String, required: true},
    registeredTournaments: [],
    earnings: String,
    admin: {type: Boolean, default: false}
})

UserSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

UserSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = this.hashPassword(this.password)
    }
    next()
})

module.exports = mongoose.model('User', UserSchema);