import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // hashSync allows us to not use await since it already incoporates it.
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save(); // code remains in this line before executing next line
        res.status(201).json("User created successfully");
    } catch (error) {
        res.status(500).json(error.message);
    }
}