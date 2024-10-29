const express = require('express');
const app = express();
const confiq = require('dotenv');
const path = require('path');
const { connect } = require('http2');
const connectDb = require('./Config/DBconnection');
confiq.config({ path: path.join(__dirname, 'Config/config.env'),});


app.use(express.json());

const product = require("./Routes/Productroutes");
app.use("/api/v1/", product);


connectDb();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});