import axios from "axios";

//const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post("http://localhost:2000/api/products", formData);
  return response.data;
  
};


// Get All Products
const getProducts = async () => {
  const response = await axios.get("http://localhost:2000/api/products");
  return response.data;
  
};
// Delete a Product
const deleteProducts = async (id) => {
  const response = await axios.delete(`http://localhost:2000/api/products/${id}`);
  return response.data;
  
};

// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(`http://localhost:2000/api/products/${id}`);
  return response.data;
};

// Update Product

const updateProducts = async (id, formData) => {
  const response = await axios.patch(`http://localhost:2000/api/products/${id}`,formData);
  return response.data;
  
};

 const productService = {
    createProduct,
    getProducts,
    deleteProducts,
    updateProducts,
    getProduct,
 }

 export default productService;
