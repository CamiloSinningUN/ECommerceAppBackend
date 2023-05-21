import mongoose, { Schema } from 'mongoose';

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
};

function softDeletePlugin(schema: Schema) {
  schema.add({ deleted: { type: Boolean, default: false } });

  schema.pre('find', function () {
    this.where({ deleted: false });
  });

  schema.pre('findOne', function () {
    this.where({ deleted: false });
  });

  schema.methods.delete = function () {
    this.deleted = true;
    return this.save();
  };

  schema.methods.restore = function () {
    this.deleted = false;
    return this.save();
  };

  schema.methods.hardDelete = function () {
    return this.remove();
  };
}

declare module 'mongoose' {
  interface Document {
    deleted: boolean;
    delete(): Promise<Document>;
    restore(): Promise<Document>;
    hardDelete(): Promise<Document>;
  }
}

mongoose.plugin(softDeletePlugin);

export default connect;
