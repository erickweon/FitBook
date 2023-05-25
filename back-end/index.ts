import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { exampleRouter } from './routers/example_router';


dotenv.config();

export const app: Express = express();

app.use(bodyParser.json());

let dburl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.ha35gkz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dburl)
  .then( () => {
      console.log('Connected to the database ');
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. n${err}`);
  })

app.use("/api/example", exampleRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
