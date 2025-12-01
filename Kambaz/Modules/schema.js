import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        description: String,
        lessons: [{_id: String, name: String, description: String}]
    }, {collection: "modules"}
);
export default moduleSchema;