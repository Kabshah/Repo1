require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = process.env.PORT || 7001;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/Trim-url").then(() =>
    console.log("Mongodb connected")
);
//setting up ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes setup
app.use("/url", urlRoute);//where shortid is generated
app.use("/", staticRoute);//(homepage)
//analytics logic
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId, },
        {
            $push: {
                visitHistory: { timestamp: Date.now(), },
            },
        }
    ); res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));