const express = require("express");
const bodyParser = require("body-parser");
const cors = require ("cors");
const mongoose = require("mongoose");

const mainRouter = require("./routes/main");
const authRouter = require("./routes/authRoutes")
const clientRouter = require("./routes/api/clients/clientsRouter");
const coachRouter = require("./routes/api/coaches/coachRoutes");
const exerciseRouter = require("./routes/api/exercises/exercises");
const User = require("./models/user");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/login", authRouter);
app.use("/api", mainRouter);
app.use("/api/clients", clientRouter);
app.use("/api/coaches", coachRouter);
app.use("/api/exercise", exerciseRouter);

const PORT = process.env.PORT || 5000;
const UserDB = process.env.DB_USERNAME || "root";
const PasswordDB = process.env.DB_PASSWORD || "qwerty123";
const NameDB = process.env.DB_NAME || "crm";
const HostDB = process.env.DB_HOST || "mongodb://mongodb:27017/";

const start = async () => {
    try {
        await mongoose.connect(HostDB, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        try {
            const adminUser = {
                    fio: "admin",
                    login: "admin",
                    password: "admin"
                };

                await User.create(adminUser);
                console.log("Admin user was created");
        } catch (err) {
            console.log("--- Collection does not exist, creating default user...");


        }

        app.listen(PORT, () => {
            console.log("Server is running on PORT " + PORT);
        });
    } catch (e) {
        console.error(e);
    }
}

start();
