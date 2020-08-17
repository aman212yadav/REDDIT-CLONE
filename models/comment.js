const mongoose = require("mongoose");
const Populate = require("../util/autopopulate");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
   author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

CommentSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'))


module.exports = mongoose.model("Comment", CommentSchema);
