import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    required: true,
  },
});

const gradeModel = mongoose.model("grade", schema, "grade");

export { gradeModel };
