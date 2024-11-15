const { s3, PutObjectCommand } = require("../Aws/s3Client.js");
const fs = require("fs");

// Function to upload files of various formats to S3
const uploadFileToS3 = async (fileName, fileContent, bucketName, mimeType) => {
  try {
    const params = {
      Bucket: specsland-app, // Your S3 bucket name
      Key: fileName, // File name
      Body: fileContent, // File content (Buffer or string)
      ContentType: mimeType, // MIME type of the file
    };

    const data = await s3.send(new PutObjectCommand(params)); // Upload the file
    console.log("File uploaded successfully:", data);
    return data;
  } catch (err) {
    console.error("Error uploading file:", err);
    throw err;
  }
};

module.exports = uploadFileToS3;    
