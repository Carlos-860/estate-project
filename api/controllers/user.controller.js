// export const test = (req, res) => {
//     res.json({
//         message: 'Hello World!'
//     })
// }

import User from "../models/user.model.js";

export const test = async (req, res) => {
    const users = await User.find({});

    return res.status(200).json({
        count: users.length,
        data: users
    });
}