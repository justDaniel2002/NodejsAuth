const mongoose = require('mongoose');

const Schema = mongoose.Schema

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
    },
    authenGoogleID:{
        type: String,
        default: null
    },
    authenFacebookID:{
        type: String,
        default: null
    },
    authType:{
        type: String,
        enum:['local','google','facebook'],
        default: 'local',
    },
    decks:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Deck'
        }
    ]
})

UserSchema.pre('save', async function(next){
    try {
        if(this.authType !== 'local') next()
        //generate a salt
        const salt = await bcrypt.genSalt(10)
        //generate a password hash(salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt)
        // re-assign password hashed
        this.password = passwordHashed

        next()
    } catch (error) {
        next(error);
    }
    
})

UserSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword, this.password)
        
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', UserSchema)
module.exports = User