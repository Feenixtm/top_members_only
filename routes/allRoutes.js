import express from "express";
import * as controller from "../controllers/allControllers.js";

const router = express.Router();

router.get("/", controller.getIndex);

router.get("/sign-up", controller.getSignUp);

router.get("/log-in", controller.getLogIn);

export default router;