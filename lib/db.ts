import mongoose from "mongoose";
import { ApiError } from "@/utils/ApiError";
// import { connect } from "http2";
// import { maxHeaderSize } from "http";

const print = console.log;

const db_Uri = process.env.DB_URI as string;

if (!db_Uri) {
    throw new ApiError(404, "Database URI not found");
}

let connChecker = global.mongoose;

if(!connChecker){
    connChecker = global.mongoose = { connection: null, promise: null };
}

/*
Q.No.1 ):-
 what is the difference og common function and arrow function? which one 
is best here?

Ans:-


*/

export const dbConnector = async () => {
    // 1. connection exist
 if(connChecker.connection){
    return connChecker.connection;
 }


     //  2. no connection create one
 if(!connChecker.connection){
    const options = {
        maxHeaderSize: 10,
        bufferCommands: false,
    }
    mongoose
    .connect(db_Uri, options)
    .then(() => {
        const printConn = mongoose.connection;
        print(printConn);
        print(`✔️ Database connected successfully ${printConn.host} 😀`);
       return mongoose.connection;
    });
 }
    //  3. connection on the way just wait
 try {
     connChecker.connection = await connChecker.promise; 
 } catch (error) {
     print(`❌ Database connection error: ${error} 😔`);
     connChecker.connection = null;
     throw new ApiError(500, `Database connection failed = ${error}`);  // note able..
 }
 return connChecker.connection;
}