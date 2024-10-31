
const Product = require("../Models/Createproduct.js")

// Get  Products --> /api/v1/products
exports.getProducts = async (req, res) => {

    const getProducts =  await Product.find();
    console.log(getProducts);
    
    res.status(200).json({
        success: true,
        status: "success get data",
        getProducts
      })
}

// Create Product --> /api/v1/product
exports.createProduct = async (req, res) => {
    console.log(req.body,"dataaaaaaaaaaaaaaa")
  const getProduct =  await Product.create(req.body);


  res.status(201).json({
    status: "success",
    data: {
      data: getProduct,
    },
  });
}

// Get Single Product --> /api/v1/product/:id
exports.singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Request received at singleProduct endpoint");
    console.log(id, "Requested product ID");

    const product = await Product.findById(id);
    if (!product) {
      console.log("Product not found");
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error in singleProduct function:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};