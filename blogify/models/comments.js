const { Schema, model } = require("mongoose");
const schema = new Schema(
  {
    content: {
      type: String,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required:true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Comment=new model('comment',schema);
module.exports=Comment;
