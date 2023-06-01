import { Router } from "express";
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const userRouter = Router();

// Requires email, password, name of user
userRouter.post('/signup', async (req, res) => {
    if (req.body.password === undefined) {
        res.status(400).json({ message: "Password is required" });
        return;
    }
    if (req.body.email === undefined) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    if (req.body.name === undefined) {
        res.status(400).json({ message: "Name is required" });
        return;
    }
    // Hashing password here
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        age: 0,
        weight: 0,
        height: 0,
    });
    user.save()
        .then((data: any) => {
            return res.json(data);
        })
        .catch((err: any) => {
            return res.status(500).json({ message: err });
        });
});

// Requires email and password to identify
userRouter.post('/signin', async (req, res) => {
    if (req.body.password === undefined) {
        res.status(400).json({ message: "Password is required" });
        return;
    }
    if (req.body.email === undefined) {
        res.status(400).json({ message: "Email is required" });
        return;
    }
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        res.status(400).json({ message: "User not found" });
        return;
    }
    const password = bcrypt.compareSync(req.body.password, user.password);
    if (!password) {
        res.status(400).json({ message: "Password incorrect" });
        return;
    }
    return res.json(user);
});

userRouter.get('/signout', async (req, res) => {
    //For now, we don't need to do anything here since we are using sessions
});
