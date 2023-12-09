import mongoose from "mongoose";

const connect = async () => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        throw new Error(error.message);
    }
}

export default connect;
