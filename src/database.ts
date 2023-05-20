import mongoose from 'mongoose';

const connect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || '', {
      dbName: process.env.MONGO_DBNAME || '',
    });
    console.log('Successfully connected to MongoDB');
    return connection;
  } catch (err) {
    console.error(err);
  }
}

export default connect;