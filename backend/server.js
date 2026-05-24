import exp from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import { commonApp } from "./APIs/CommonAPI.js";
import { IncomeAndExpenseApp } from "./APIs/IncomeAndExpenseAPI.js";
import { AIInsightsApp } from "./APIs/AIInsightsAPI.js";
import { PredictionApp } from "./APIs/PredictionAPI.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = exp();

// ✅ CORS config — must be before everything else
const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin === "http://localhost:5173" ||
      /^https:\/\/expense-tracker-with-ai-insights.*\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Body parser middleware
app.use(exp.json());

// Cookie parser middleware
app.use(cookieParser());

// Route middlewares
app.use("/auth", commonApp);
app.use("/transaction", IncomeAndExpenseApp);
app.use("/ai", AIInsightsApp);
app.use("/prediction", PredictionApp);

// Connect to DB and start server
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB server connected");
    const port = process.env.PORT || 1971;
    app.listen(port, () => console.log(`server listening on ${port}..`));
  } catch (err) {
    console.log("err in db connect", err);
  }
};
connectDB();

// Handle invalid paths
app.use((req, res, next) => {
  console.log(req.url);
  res.status(404).json({ message: `path ${req.url} is invalid` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("error is ", err);
  console.log("Full error:", JSON.stringify(err, null, 2));

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  res.status(500).json({ message: "error occurred", error: "Server side error" });
});
