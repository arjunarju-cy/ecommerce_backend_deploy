import mongoose from "mongoose";

export const connectMongoDatabase = () => {
    let dbUri = process.env.DB_URI;
    if (!dbUri) {
        console.log("Error: DB_URI is not defined in environment variables. Connecting to DB will be skipped.");
        return;
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
    });
}
