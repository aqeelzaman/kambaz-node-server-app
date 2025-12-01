import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        _id: String,
        course: String,
        user: String,
        grade: Number,
        letterGrade: String,
        enrollmentDate: Date,
        status: {
            type: String,
            enum: ["ENROLLED", "DROPPED", "COMPLETED"],
            default: "ENROLLED",
        },
    },
    {collection: "enrollments"}
);
export default enrollmentSchema;