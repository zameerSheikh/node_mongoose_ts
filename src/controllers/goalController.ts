import Express from 'express';
import asyncHandler from 'express-async-handler';
import { goalModel } from "../models/goalModel";
import { userModel } from "../models/userModel";
import { UserRequest } from "../middleware/authMiddleware";



// @desc Get goals
// @route GET /api/goals
// @access Private
export const getGoals = asyncHandler(async (req: UserRequest, res:Express.Response) => {

    const goals = await goalModel.find({user: req.user.id});
    res.json(goals)
})

// @desc Set goal
// @route POST /api/goals
// @access Private
export const setGoal = asyncHandler(async (req: UserRequest, res:Express.Response) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error("please add a text field");
    }
    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user.id
    })
    res.json(goal)
})

// @desc Get goals
// @route PUT /api/goals/id
// @access Private
export const updateGoal = asyncHandler(async (req: UserRequest, res:Express.Response) => {

    const goal = await goalModel.findById(req.params.id);
    if(!goal) {
        res.status(400);
        throw new Error('No goal found with that id');
    }

    // check for user
    if(!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // make sure login user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedGoal)
})

// @desc Get goals
// @route DELETE /api/goals/id
// @access Private
export const deleteGoal = asyncHandler(async (req: UserRequest, res:Express.Response) => {
    const goal = await goalModel.findById(req.params.id);
    if(!goal) {
        res.status(400);
        throw new Error('No goal found with that id');
    }

    // check for user
    if(!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // make sure login user matches the goal user
    if(goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goalModel.findByIdAndRemove(req.params.id);
    res.json(req.params.id)
})