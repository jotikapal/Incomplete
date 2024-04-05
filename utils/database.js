import mongoose from "mongoose";

let isConnect = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnect) {
        console.log("Mongodb is already connect");
        return;
    }
    try {
        await mongoose.connect('mongodb+srv://jotika:J1v69uriOPx5wzoi@cluster0.lammybb.mongodb.net/mydata?retryWrites=true&w=majority&appName=Cluster0', {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnect = true;

        console.log('MongoDb connected')
    } catch (error) {
        console.log(error)
    }
} 