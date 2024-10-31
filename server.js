const express = require('express');
const app = express();
const confiq = require('dotenv');
const path = require('path');
const { connect } = require('http2');
const connectDb = require('./Config/DBconnection');
const cors = require('cors')
confiq.config({ path: path.join(__dirname, 'Config/config.env'),});


app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],

    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the API!"); // A simple response for the root URL
});
app.get("/testcors", (req, res) => {
  res.json({ message: "CORS is working!" });
});
const product = require("./Routes/Productroutes");
app.use("/api/v1/", product);


connectDb();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});