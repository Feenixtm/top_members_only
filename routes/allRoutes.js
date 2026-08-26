import express from "express";
import * as controller from "../controllers/allControllers.js";

import passport from "passport";

const router = express.Router();

router.get("/", controller.getIndex);

router.get("/sign-up", controller.getSignUp);

router.get("/log-in", controller.getLogIn);

router.get("/create-new-message", controller.getCreateNewMessage);

router.get("/join-the-club", controller.getJoinTheClub);

router.get("/admin-request-form", controller.getAdminRequestForm);

router.get("/log-out", controller.getLogOut);

// ------------------------------------------

router.post("/sign-up", controller.postSignUp);

router.post("/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
    })
);

router.post("/create-new-message", controller.postCreateNewMessage);

router.post("/join-the-club", controller.postJoinTheClub);

router.post("/admin-request", controller.postAdminRequest);

// ------------------------------------------

router.post("/delete/comment/:id", controller.postDeleteMessage);

export default router;