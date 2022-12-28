import mongoose ,{ConnectOptions, Document, Model, Schema} from "mongoose";

const mongooseOption={
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const mongoDbConnection =mongoose.createConnection(process.env.CONNECTION_STRING, mongooseOption as ConnectOptions);
mongoDbConnection.on('open', () => {
  console.log('connected to database...');
})

mongoDbConnection.on('error', (err) => {
  console.log('Error in database connection', err);
})


export const getModel = (
  modelName: string,
  schema: Schema,
): any => {
  const db = mongoDbConnection.useDb(process.env.DB_NAME, { useCache: true });
    return db.model(modelName, schema, modelName);
};