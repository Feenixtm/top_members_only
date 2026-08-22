import express from "express";
import * as controller from "../controllers/allControllers.js";

const router = express.Router();

router.get("/", controller.getIndex);

export default router;