const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


//  Generate Token\

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
};


// Register User

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body



    // Validation
    if (!name || !email || !password) {

        res.status(400)
        throw new Error("Please fill in all required fields")
    }

    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be up to 6 characters")

    }
    //Check if user email already exists 

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("Email has already been used")
    }



    // Create New user

    const user = await User.create({
        name,
        email,
        password,
    })


    //Generate Token
    const token = generateToken(user._id)

    //

    // SEND HTTP - only cookie

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),// 1 day
        sameSite: "none",
        secure: true,
    });

    if (user) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        })
    } else {
        res.status(400)
        throw new Error("Invalid User data")
    }

});


// Login User


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Validate Request 

    if (!email || !password) {
        res.status(400)
        throw new Error("Please Add email and password")
    }
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error("User Not found , Please SignUp")
    }

    // User Exists, check if password is correct 
    const passwordIsCorrect = await bcrypt.compare(password, user.password)



    //Generate Token
    const token = generateToken(user._id)

    //

    // SEND HTTP - only cookie
    if (passwordIsCorrect) {
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),// 1 day
            sameSite: "none",
            secure: true,
        });
    }

    if (user && passwordIsCorrect) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,
            token,
        })

    } else {
        res.status(400)
        throw new Error("Invalid Email or password")
    }

});

// Logout User

const logout = asyncHandler(async (req, res) => {

    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "Succesfully Logged out" })


});

// Get User Data

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio,

        })

    } else {
        res.status(400)
        throw new Error("User not Found")
    }
})

//get login status
const loginStatus = asyncHandler(async (req, res) => {

    const token = req.cookies.token;
    if (!token) {
        return res.json(false)
    }
    // Verify token

    const verified = jwt.verify(token, process.env.JWT_SECRET)

    if (verified) {
        return res.json(true)
    }
    return res.json(false)
});

// Update User

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const {name, email, photo, phone, bio } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.bio = req.body.bio || bio;
        user.photo = req.body.photo || photo;


        const updateduser = await user.save()
        res.status(200).json({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            photo: updateduser.photo,
            phone: updateduser.phone,
            bio: updateduser.bio,
        })

    }else{
        res.status(404)
        throw new Error("User not found")
    }



});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,

};