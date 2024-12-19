// Import the s3 client instance from awsConfig.js
const s3 = require('../Config/awsConfig'); // adjust the path as needed
const { PutObjectCommand } = require('@aws-sdk/client-s3');

// Define the service function to upload files to S3
const uploadFileToS3 = async (fileBuffer, fileName, bucketName) => {
  const uploadParams = {
    Bucket: bucketName,
    Key: fileName, // The name of the file to store in S3
    Body: fileBuffer, // The file's content in buffer form
    ContentType: 'image/jpeg', // Modify this based on the file type
  };

  try {
    // Send the request to S3 and wait for the result
    const result = await s3.send(new PutObjectCommand(uploadParams));
    return result; // Return the S3 response
  } catch (error) {
    throw new Error('Error uploading file to S3: ' + error.message);
  }
};

// Export the service for use in controllers
module.exports = {
  uploadFileToS3,
};
