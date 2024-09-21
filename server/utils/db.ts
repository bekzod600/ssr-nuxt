import mongoose from "mongoose";

// const MONGODB_URI = "mongodb://localhost:27017/rest-app";
const MONGODB_URI =
  "mongodb+srv://bekzod:944455537@cluster0.iahpanx.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0";

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
};

export default connectMongo;
