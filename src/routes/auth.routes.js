import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma.Client.js'


const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body

    try {
        // check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { username }
        })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." })
        }

        // encrypt the password
        const hashedPassword = bcrypt.hashSync(password, 8)

        // create the user
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword 
            }
        })

        // add a welcome todo
        await prisma.todo.create({
            data: {
                task: "Get started by writing your first task!",
                userId: user.id
            }
        })

        // create token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
        console.log("User registered successfully:", user); // Log successful registration
        

    } catch (err) {
        console.error("❌ Registration error:", err); // Log full error
        res.status(503).json({ message: "Service Unavailable" });
    }
})


router.post('/login', async (req, res) => {
    // we get their email, and we look up the password associated with that email in the database
    // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
    // so what we can to do, is again, one way encrypt the password the user just entered

    const { username, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        // if we cannot find a user associated with that username, return out from the function
        if (!user) { return res.status(404).send({ message: "User not found" }) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if the password does not match, return out of the function
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password" }) }
        // then we have a successful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
        log("User logged in successfully:", user); // Log successful login
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})


export default router