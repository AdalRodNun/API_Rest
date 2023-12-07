const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,
            select:false //quitar la contraseña
        },
        role:{
            type:["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps:true, //createdAt, updatedAt
        versionKey:false
    }
)

UserScheme.plugin(mongooseDelete, {overrideMethods: "all"}) //añadir el soft delete, y sobreescribir los metodos nuevos sobre los nativos de mongoose

module.exports = mongoose.model("users", UserScheme)