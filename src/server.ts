import Express from 'express';
import { config } from 'dotenv';
const dotenv = config();
import { errorHandler } from './middleware/errorMiddleware';
import goalRouter from './routes/goalRoutes'
import userRouter from './routes/userRoutes'
import { connectDB } from './config/db';

const port =  process.env.PORT || 5000;

connectDB();

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended: false}));

app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log('server started on port', port)
})