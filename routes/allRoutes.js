import express from "express";
import * as controller from "../controllers/allControllers.js";

import passport from "passport";

const router = express.Router();

router.get("/", controller.getIndex);

router.get("/sign-up", controller.getSignUp);

router.get("/log-in", controller.getLogIn);

router.get("/log-out", controller.getLogOut);

// ------------------------------------------

router.post("/sign-up", controller.postSignUp);

router.post("/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
    })
)



export default router;