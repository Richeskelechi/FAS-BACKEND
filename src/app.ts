import 'dotenv/config'
import express, { application } from 'express';
import adminRouter from './routes/adminRoutes';
import funNumberRouter from './routes/funNumberRoutes'
import userRouter from './routes/userRoutes'
import eventRouter from './routes/eventRoutes';
import contributionRouter from './routes/contributionRoutes';
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
app.use("/admin/api/v1", adminRouter);
app.use("/event/api/v1", eventRouter);
app.use("/funNumber/api/v1", funNumberRouter);
app.use("/user/api/v1", userRouter);
app.use('/contribution/api/v1', contributionRouter);

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