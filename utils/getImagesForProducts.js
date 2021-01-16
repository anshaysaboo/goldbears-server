const { getImageSignedURL } = require("../utils/S3Utils");

module.exports = async (products) => {
  try {
    await Promise.all(
      products.map(async (product) => {
        if (product.imageKey) {
          product.imageUrl = await getImageSignedURL(product.imageKey);
        }
      })
    );
    return products;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
