import mongoose from "mongoose";

export const connectMongoDatabase = () => {
    let dbUri = process.env.DB_URI;
    if (!dbUri) {
        console.log("Error: DB_URI is not defined in environment variables.");
        process.exit(1);
    }

    dbUri = dbUri.trim();
    if (dbUri.startsWith('"') && dbUri.endsWith('"')) {
        dbUri = dbUri.slice(1, -1);
    } else if (dbUri.startsWith("'") && dbUri.endsWith("'")) {
        dbUri = dbUri.slice(1, -1);
    }

    mongoose.connect(dbUri).then((data) => {
        console.log(`MongoDB connected with server ${data.connection.host}`);
    }).catch((err) => {
        console.log(`MongoDB connection failed: ${err.message}`);
        // Do not crash instantly to allow log flushes, but wait 1 sec
        setTimeout(() => process.exit(1), 1000);
    });
}
