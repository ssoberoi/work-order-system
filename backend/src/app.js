import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});

app.use(errorHandler);

export default app;