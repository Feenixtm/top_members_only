import express from "express";
import path from "node:path";
import router from "./routes/allRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Use ejs
const currentDirectory = import.meta.dirname;
app.set("views", path.join(currentDirectory, "views"));
app.set("view engine", "ejs");

app.use("/", router);

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.log("A fatal error occurred while trying to listen to the server:", error);
        return;
    }
    console.log("Listening to Port:", PORT);
})