import mongoose from "mongoose";
import { gradeModel } from "./grade.schema.js";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grade = gradeModel;

export { db };
