require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const checkStatusMiddleWare = require("./middleware/checkStatusMiddleWare");
const path = require("path");

const PORT = process.env.PORT || 9000;

const app = express();

const corsOptions = {
    origin: ["https://auth-app-iw5q.onrender.com", "https://auth-app-frontend-whjv.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(checkStatusMiddleWare);
app.use("/api", router);
//tha last middleware:
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};
start();
