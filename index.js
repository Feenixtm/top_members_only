import express from "express";
import path from "node:path";
import router from "./routes/allRoutes.js"
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Use EJS
const currentDirectory = import.meta.dirname;
app.set("views", path.join(currentDirectory, "views"));
app.set("view engine", "ejs");

// Use Passport & Sessions
app.use(session({ secret: "cats", resave: false, saveUninitialized: false}))
app.use(passport.session());

// Use CSS
app.use(express.static(path.join(currentDirectory, "public")));

// Read Forms
app.use(express.urlencoded({ extended: false }));

// Allow the use of LocalStrategy in allController.js
import "./config/passport.js";

app.use("/", router);

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.log("A fatal error occurred while trying to listen to the server:", error);
        return;
    }
    console.log("Listening to Port:", PORT);
})