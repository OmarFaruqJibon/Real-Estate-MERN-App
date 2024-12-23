import bcrypt from 'bcrypt'; //bcrypt library for hashed passwords
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);  //hashed the users password

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    console.log(newUser);

};

export const login = async (req, res) => {

    const { username, password } = req.body; //get user info from input form

    try {
        // CHECK IF THE USER EXISTS
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) return res.status(400).json({ message: "Invalid User!" });


        // CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid Password!" });


        // GENERATE COOKIE TOKEN AND SEND TO THE USER

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY, { expiresIn: age });

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            maxAge: age
        }).status(200).json({ message: "Login Successfully!" })


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login!" });
    }
}




export const logout = (req, res) => {

    res.clearCookie("token").status(200).json({ message: "Logout Success." })

}