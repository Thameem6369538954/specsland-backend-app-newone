const express = require('express');
const app = express();
const confiq = require('dotenv');
const path = require('path');
const { connect } = require('http2');
const connectDb = require('./Config/DBconnection');
const cors = require('cors')
confiq.config({ path: path.join(__dirname, 'Config/config.env'),});
const cookieParser = require("cookie-parser");

// require("dotenv").config();
console.log("MongoDB URL:", process.env.DB_LOCAL_URL);


app.use(cookieParser());
app.options('*', cors());  // Enable CORS for all preflight requests
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://specsland-app.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the API!"); // A simple response for the root URL
});
app.get("/testcors", (req, res) => {
  res.json({ message: "CORS is working!" });
});
const product = require("./Routes/Productroutes");
const user = require("./Routes/userrouter")
app.use("/api/v1/", product);
app.use("/api/v1/", user);


connectDb();

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Server running on port this server onnnnnnnnnn ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});