import { Router } from "express";

import { User } from '../models/exampleUser';
export const exampleRouter = Router();

exampleRouter.get('/', async (req, res) => {
    res.send('Hello from example router');
});

exampleRouter.post('/adduser', async (req, res) => {
    console.log(req.body);
    const user = new User({
        name: req.body.name,
        age: req.body.age,
    });
    user.save()
        .then( (data: any) => {
            res.json(data);
        })
        .catch( (err : any) => {
            res.json({message: err});
        });
});

exampleRouter.get('/getuser', async (req, res) => {
    const name = req.query.name;
    User.findOne({name: name})
        .then( (data: any) => {
            res.json(data._id.toString());
        })
        .catch( (err: any) => {
            res.json({message: err});
        });
    
});