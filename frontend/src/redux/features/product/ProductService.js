import axios from "axios";


 const BACKEND_URL = process.env.BACKEND_URL

 const API_URL = `${BACKEND_URL}/api/products`
 // Create New Product

 const createProduct = async(formData) => {
    const response = await axios.post(API_URL,formData)
    return response.data
 }

 const productService = {
    createProduct
 }

 export default productService;