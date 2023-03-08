import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
mongoose.set("strictQuery", true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connected to mongoDB!");
    } catch (error) {
        console.log(error);
    }
};

app.use(cors({ origin: process.env.MY_SITE, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
    connect();
    console.log("Backend server is running!");
});
