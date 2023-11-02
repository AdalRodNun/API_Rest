const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const TrackScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true
                },
                messagee: "ERROR_URL"
            }
        },
        artist: {
            name: {
                type: String
            },
            nickname:{
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps:true, //createdAt, updatedAt
        versionKey:false
    }
)

TrackScheme.plugin(mongooseDelete, {overrideMethods: "all"}) //añadir el soft delete, y sobreescribir los metodos nuevos sobre los nativos de mongoose

module.exports = mongoose.model("tracks", TrackScheme)