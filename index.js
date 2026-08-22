import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.log("A fatal error occurred while trying to listen to the server:", error);
        return;
    }
    console.log("Listening to Port:", PORT);
})