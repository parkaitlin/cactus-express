const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    hometown: String,
    state: String,
    member: Boolean,
    paid: {type: Boolean, default: false},
    status: {type: String, required: true},
    registeredTours: [],
    earnings: {type: String, default: '0'},
    admin: {type: Boolean, default: false},
    joined: {type: Date, default: new Date()}
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


// UserSchema.methods.cleanDate = (date)=>{
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
//     const month = new Date(date).getMonth()
//     const day = new Date(date).getDate()
//     const year = new Date(date).getFullYear()
//     return (`${months[month]} ${day}, ${year}`)
// }


