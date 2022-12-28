import express from 'express';
import { PORT } from './helpers/constants';
import "./config/db"
import userRoutes from "./routes/user"
import passport from 'passport';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));


app.use("/api/user", userRoutes);


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})