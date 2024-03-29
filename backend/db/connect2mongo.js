import mongoose from "mongoose";

const connect2mongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error : ", error.message);
  }
};

export default connect2mongo;
