import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique :true,
        trim: true,
        index: true //database searching -->costly also
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique :true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,  //cloudinary url we are using
        required: true,
    },
    coverImage:{
        type: String
    },
    watchHistory: [ {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
],
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    refreshToken: {
        type: String
    }


},
{timestamps: true}
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccesstoken= function (){
    return jwt.sign(
        {
            _id: this._id, //we get this from mongodb id
            email: this.email,
            username: this.username,
            fullname: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshtoken= function (){return jwt.sign(
        {
            _id: this._id, //we get this from mongodb id
           //gets refreshed everytime therefore we store less information
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )}

export const User = mongoose.model("User",userSchema)