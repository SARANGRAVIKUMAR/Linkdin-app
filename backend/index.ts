import express from 'express';
import { PORT } from './helpers/constants';
import "./config/db"


const app = express();

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})