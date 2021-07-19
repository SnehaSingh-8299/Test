const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Schema.Types.ObjectId;

const DocSchema = new Schema(
    {
        email: { type: String, default: "", index: true },
        phoneNo: { type: String, default: "" },
        dialCode: { type: String, default: "" },
        password: { type: String, default: "", index: true },
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        image: { type: String, default: "" },
        gender: { type: String, default: "", enum: ["", "MALE", "FEMALE", "OTHER"] },
        isBlocked: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        googleId: {
            type: String,
            default: "",
            index: true
        },
        facebookId: {
            type: String,
            default: "",
            index: true
        },
        accessToken:{
            type: String,
            default: "",
            index: true
        },
        isPhoneVerified:{ type: Boolean, default: true},
        isEmailVerified:{ type: Boolean, default: true},
        secretCode: { type: String, default: "" },
        secretExpiry: { type: Date, default: 0 },

    },
    
    { timestamps: true }
);
DocSchema.virtual("fullName")
    .get(function () {
        return this.firstName + " " + this.lastName;
    })
    .set(function (val) {
        this.firstName = val.substr(0, val.indexOf(" "));
        this.lastName = val.substr(val.indexOf(" ") + 1);
    });

DocSchema.methods.authenticate = function (password, callback) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("MISSING_PASSWORD"));

        bcrypt.compare(password, this.password, (error, result) => {
            if (!result) reject(new Error("INVALID_PASSWORD"));
            resolve(this);
        });
    });

    if (typeof callback !== "function") return promise;
    promise.then((result) => callback(null, result)).catch((err) => callback(err));
};

DocSchema.methods.setPassword = function (password, callback) {
    console.log("inin");
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("Missing Password"));

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err);
            this.password = hash;
            resolve(this);
        });
    });

    if (typeof callback !== "function") return promise;
    promise.then((result) => callback(null, result)).catch((err) => callback(err));
};


module.exports = mongoose.model("User", DocSchema);
