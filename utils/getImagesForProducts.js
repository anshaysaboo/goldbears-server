const { getImageSignedURL } = require("../utils/S3Utils");

module.exports = async (products) => {
  try {
    const productImages = [];
    await Promise.all(
      products.map(async (product) => {
        product = product.toJSON();
        if (product.imageKey) {
          product.imageUrl = await getImageSignedURL(product.imageKey);
        }
        productImages.push(product);
      })
    );
    return productImages;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
