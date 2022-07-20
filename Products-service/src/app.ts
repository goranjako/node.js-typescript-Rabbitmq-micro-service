import compression from "compression";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import path from "path";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./util/errorHandler";
import setRoutes from "./routes";
import Connect from "./config/db";
import RabbitMQ from "./services/order.service";
const app = express();
dotenv.config();
Connect.connectDB();
// enable cors
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));
//use swagger-doc

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet()); // Set security headers

app.use(hpp()); // Prevent http param polution
app.use(compression());
app.use(mongoSanitize()); // Sanitize request
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuates
  max: 100, // 100 requests
});
app.use(limiter);
// routes setup
setRoutes(app);
RabbitMQ.Conect();
// Catch all route
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not a valid route",
  });
});
// error handler
app.use(notFound);
app.use(errorHandler);

export default app;
