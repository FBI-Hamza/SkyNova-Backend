var mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const secret = "Hamza";

var userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// userSchema.methods.generateToken = async function(){
//     try {
//         return jwt.sign({
//             userName:this.userName.toString(),
//         },
//         secret,{
//             expiresIn:"1d"
//         }
//     );
//     }catch(error){
//         console.error(error);
//     }
// };


module.exports = mongoose.model('user', userSchema);