const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const constants = require("../common/constants");

const DocSchema = new Schema(
    {
        userId: {
            type : ObjectId,
            ref : 'User'
        },
        itemName :{
            type: String,
            default: "" 
        },
        itemQuantity :{
            type: Number,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },{
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    })
module.exports = mongoose.model("Order", DocSchema);
