const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    name: String,
    account: Number,
    description: String,
})


module.exports = mongoose.model("Posts", PostSchema)