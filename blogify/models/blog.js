const { Schema, model } = require("mongoose");
const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    coverImageURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog=new model('blog',schema);
module.exports=Blog;
