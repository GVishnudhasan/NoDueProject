import mongoose from "mongoose";
const MONGO_URI = "mongodb://localhost:27017/NoDueProject";
const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDatabase;