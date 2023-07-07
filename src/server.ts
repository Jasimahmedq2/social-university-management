import mongoose from 'mongoose';
import config from './config';
import app from './app';

const port = config.port || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_connect as string);
    console.log('yee, db connected');
    app.listen(port, () => {
      console.log('servicer is running:', port);
    });
  } catch (error) {
    console.log(error);
  }
};
connectDB();
