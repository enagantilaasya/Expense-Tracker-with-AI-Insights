import express from "express";
import { getAIInsights } from "./AIController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
export const AIInsightsApp = express.Router();
AIInsightsApp.get("/ai-insights", 
                    verifyToken,
                    getAIInsights
                 );