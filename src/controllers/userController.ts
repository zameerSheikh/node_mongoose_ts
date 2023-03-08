import Express from 'express';
import asyncHandler from 'express-async-handler';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userModel } from "../models/userModel";
import { Types } from 'mongoose';
import { UserRequest } from "../middleware/authMiddleware";

// @desc Get user details
// @route GET /api/users/me
// @access Private
export const getUserDetails = asyncHandler(async (req: UserRequest, res:Express.Response) => {
    res.status(200).json(req.user)
})

// @desc Register user
// @route POST /api/users
// @access Pubic
export const registerUser = asyncHandler(async (req: UserRequest, res:Express.Response) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // check if user already exists
    const userExists = await userModel.findOne({email})

    if(userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    // has password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🚀 ~ file: userController.ts:36 ~ registerUser ~ hashedPassword:", hashedPassword)

    // create a user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc Authenticate a user
// @route PUT /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req: UserRequest, res:Express.Response) => {
    const { email, password } = req.body;
    // check user email
    const user = await userModel.findOne({email});

    // check password
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials'); 
    }
})

// generate jwt
const generateToken = (id: Types.ObjectId) => {
    const secretToken = process.env.JWT_SECRET || 'topSecret';
    return Jwt.sign({ id }, secretToken, {
        expiresIn: '30d'
    })
}