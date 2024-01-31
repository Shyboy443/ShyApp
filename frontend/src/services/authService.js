import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.BACKEND_URL

export const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

// Register 


export const registerUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:2000/api/users/register", userData,
      { withCredentials: true })


    toast.success("Registered Successfully")
    return response.data;

  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message)
  }


}


// Login

export const loginUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:2000/api/users/login", userData,
    )
    if (response.statusText === "OK") {

      toast.success("Login  Success")
      return response.data;
    }
  } catch (error) {
    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();
    toast.error(message)
  }


}

// Logout
export const logoutUser = async () => {
  try {
    await axios.get(`http://localhost:2000/api/users/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Forgot Password

export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:2000/api/users/forgotpassword`, userData);
    toast.success(response.data.message)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Reset Password
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(`http://localhost:2000/api/users/resetpassword/${resetToken}`, userData);


    return response.data

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get Login Status 

export const getLoginStatus = async (userData, resetToken) => {
  try {
    const response = await axios.get(`http://localhost:2000/api/users/loggedin`);


    return response.data

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Get User Profile

export const getUser = async (userData, resetToken) => {
  try {
    const response = await axios.get(`http://localhost:2000/api/users/getuser`);
    return response.data

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


// Update Profile 


export const updateUser = async (formData) => {
  try {
    const response = await axios.patch(`http://localhost:2000/api/users/updateuser`,formData);
    return response.data

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Change Password
export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(`http://localhost:2000/api/users/changepassword`,formData);
    return response.data

  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

