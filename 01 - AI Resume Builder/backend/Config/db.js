import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongodbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI env variable not found");
    }

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    const finalURI = `${mongodbURI}/${projectName}`;

    await mongoose.connect(finalURI);

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
