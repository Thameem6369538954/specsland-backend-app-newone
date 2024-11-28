const express = require('express');
const app = express();
const confiq = require('dotenv');
const path = require('path');
const { connect } = require('http2');
const connectDb = require('./Config/DBconnection');
const cors = require('cors')
confiq.config({ path: path.join(__dirname, 'Config/config.env'),});
const cookieParser = require("cookie-parser");

require("dotenv").config();


app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://specsland-app.vercel.app"],  // Allow localhost and production URLs
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed methods
    credentials: true,  // Allow cookies or credentials
    allowedHeaders: ["Content-Type", "Authorization"],  // Add this to specify allowed headers
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the API!"); // A simple response for the root URL
});
app.get("/testcors", (req, res) => {
  res.json({ message: "CORS is working!" });
});
const product = require("./Routes/Productroutes");
const user = require("./Routes/userrouter.js")
app.use("/api/v1/", product);
app.use("/api/v1/", user);


connectDb();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port this server onnnnnnnnnn ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});