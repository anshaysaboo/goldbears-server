const keys = require("../config/keys");
const AWS = require("aws-sdk");

const s3Client = new AWS.S3({
  accessKeyId: keys.AWSAccessKeyID,
  secretAccessKey: keys.AWSSecretKey,
  region: "us-west-1",
});

exports.uploadImage = (file, keyName) => {
  if (!file) return {};
  const ext = file.originalname.split(".").pop() || "jpg";
  const params = {
    Body: file.buffer,
    Bucket: keys.AWSBucketName,
    Key: keyName + "." + ext,
  };
  return s3Client.upload(params).promise();
};

exports.getImageSignedURL = async (key) => {
  const params = {
    Bucket: keys.AWSBucketName,
    Key: key,
  };
  return s3Client.getSignedUrl("getObject", params);
};

exports.deleteImage = (key) => {
  const params = {
    Bucket: keys.AWSBucketName,
    Key: key,
  };
  return s3Client.deleteObject(params).promise();
};
