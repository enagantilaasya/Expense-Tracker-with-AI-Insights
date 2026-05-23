import express from "express";
import { getPredictions }from "./PredictionController.js";
import { verifyToken }from "../middlewares/verifyToken.js";
export const PredictionApp =express.Router();
PredictionApp.get("/future",
                  verifyToken,
                  getPredictions
                  );