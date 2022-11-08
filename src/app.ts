import 'dotenv/config'
import express from 'express';
import adminRoute from './routes/adminRoutes';
import connectDB from './db/connectDB';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/admin/api/v1", adminRoute);

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

