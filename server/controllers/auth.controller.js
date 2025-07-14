import bcrypt from 'bcrypt'; //bcrypt library for hashed passwords
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password, role, phone } = req.body;


    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        // create new user and save to the database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                phone,
                password: hashedPassword,
                role: role || "NORMAL",  // sets role, defaults to NORMAL
            },
        });
        console.log(newUser);

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.log(err);
        if (err.code === 'P2002' && err.meta?.target?.includes('phone')) {
            return res.status(400).json({ message: "Phone number already in use!" });
        }
        res.status(500).json({ message: "Failed to create user!" });

    }
};


export const login = async (req, res) => {

    const { phone, password } = req.body; //get user info from input form

    try {
        // CHECK IF THE USER EXISTS
        const user = await prisma.user.findUnique({
            where: { phone }
        });
        if (!user) return res.status(400).json({ message: "Invalid User!" });

        // CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid Password!" });


        // GENERATE COOKIE TOKEN AND SEND TO THE USER
        const age = 1000 * 60 * 60 * 24 * 7;

        console.log("User role at login:", user.role);

        const token = jwt.sign({  // GENERATE JWT TOKEN
            id: user.id,
            role: user.role  //  include user role
        }, process.env.JWT_SECRET_KEY, { expiresIn: age });

        const { password: userPassword, ...userInformation } = user;

        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,
            maxAge: age
        }).status(200).json(userInformation)

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login!" });
    }
}



export const logout = (req, res) => {

    res.clearCookie("token").status(200).json({ message: "Logout Success." })
}