import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import donviRoute from "./routes/donviRoute.js";
import thietbiRoute from "./routes/thietbiRoute.js";
import tonghoptbRoute from "./routes/thonghoptbRoute.js";
import khuvucRoute from "./routes/khuvucRoute.js";
import cookieParser from "cookie-parser";
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// public routes
app.use("/api/auth", authRoute);

// private routes
app.use(protectedRoute);
app.use("/api/users", userRoute);
app.use("/api/donvi", donviRoute);
app.use("/api/thietbi", thietbiRoute);
app.use("/api/tonghoptb", tonghoptbRoute);
app.use("/api/khuvuc", khuvucRoute);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server bắt đầu trên cổng ${PORT}`);
  });
});
