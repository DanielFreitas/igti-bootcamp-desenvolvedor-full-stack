import mongoose from "mongoose";

const url = `mongodb+srv://admin:palmeiras@clusterbootcampigti.zdgzr.mongodb.net/bank?retryWrites=true&w=majority`;

const connect = () => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB Atlas: ${url}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log(`Database disconnected from: ${url}`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Database error on connection: ${err}`);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Database disconnected due the end of application");
      process.exit(0);
    });
  });
};

export { connect };
