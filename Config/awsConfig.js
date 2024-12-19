// Import the AWS SDK v3 package for S3
const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create an instance of S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Export the S3 instance to use in other parts of the app
module.exports = s3;
