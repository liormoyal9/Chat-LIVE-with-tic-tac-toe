import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
    console.log("MongoDB URL:", process.env.MONGO_DB_URL);
  }
};

export default connectToMongoDB;
