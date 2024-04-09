const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    encryptionKey:{
        type:Buffer,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

    // encryptedDataAndIv: [{
    //     encryptedData: {
    //         type: Buffer,
    //         required: true
    //     },
    //     iv: {
    //         type: Buffer,
    //         required: true
    //     }
    // }],

//older code
// const mongoose = require('mongoose');

// const USerSchema= new mongoose.Schema({
//     userId:{
//         type:String,
//         required:true
//     },
//     encryptedDataAndIv: [{
//         encryptedData: {
//             type: Buffer,
//             required: true
//         },
//         iv: {
//             type: Buffer,
//             required: true
//         }
//     }],
//     encryptionKey:{
//         type:Buffer,
//         required:true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const UserModel = mongoose.model("users", USerSchema);
// module.exports = UserModel;
