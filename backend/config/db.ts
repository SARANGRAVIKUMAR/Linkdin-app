import mongoose ,{ConnectOptions} from "mongoose";

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }as ConnectOptions)
  .then(
    () => {
      console.log("Connected to database successfully");
    },
    (err) => {
      console.log(err);
    }
);
