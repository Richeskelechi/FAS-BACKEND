import 'dotenv/config'
import express from 'express';
import adminRoute from './routes/adminRoutes';
import contributionRouter from './routes/contributionRoutes';
import funNumberRouter from './routes/funNumberRoutes'
import cors from 'cors';
import connectDB from './db/connectDB';

const corsOptions ={
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/admin/api/v1", adminRoute);
app.use("/contribution/api/v1", contributionRouter);
app.use("/funNumber/api/v1", funNumberRouter);

const startApp = async () =>{
    try{
        await connectDB(process.env.DATABASE_URL!);
        const port= process.env.PORT || 3030;
        app.listen(port, () => {
            console.log(`The application is listening on port ${port}! And Database is Connected`);
        })
    }
    catch(err){
        console.log(err);
    }
}

startApp();