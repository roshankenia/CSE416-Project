const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Top5ListSchema = new Schema(
  {
    name: { type: String, required: true },
    items: { type: [String], required: true },
    ownerEmail: { type: String, required: true },
    username: {type: String, required: true},
    published: { type: Boolean, required: true },
    publishedDate: { type: String, required: true },
    comments: { type: Map, of: String, required: true },
    likes: { type: [String], required: true },
    dislikes: { type: [String], required: true },
    views: { type: Number, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Top5List", Top5ListSchema);
