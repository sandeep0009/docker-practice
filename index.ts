import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { redisConnect } from "./config/redis";
import { prisma } from "./config/prismaClient";

const port = 3000;
const app = express();
dotenv.config();



redisConnect();

app.post('/create-user', async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email } = req.body;
        const userExist = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (userExist) {
            return res.status(400).json({
                message: 'user already exist'
            })
        }
        await prisma.user.create({
            data: {
                name,
                email
            }
        })
        res.status(200).json({
            message: 'user created successfully'
        })

    } catch (error) {
        console.log('error in creating user', error);

    }
});


app.get('/all-user', async (req, res) => {
    try {
        const user = await prisma.user.findMany();
        res.status(200).json(user);
    } catch (error) {
        console.log('error in all user', error);

    }
})


app.listen(port, () => {
    console.log(`connected to backend : ${port}`);
})