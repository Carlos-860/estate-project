import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = async (req, res) => {
    const users = await User.find({});

    return res.status(200).json({
        count: users.length,
        data: users
    });
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account!"))

        // Validation check for username
    if (!req.body.username || req.body.username.trim() === "") {
        return next(errorHandler(400, "Username is required and cannot be empty."));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }


        }, { new: true });

        const { password, ...rest } = updatedUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}