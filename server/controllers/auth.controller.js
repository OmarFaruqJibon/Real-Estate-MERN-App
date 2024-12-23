import bcrypt from 'bcrypt'; //bcrypt library for hashed passwords

export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);  //hashed the users password

    console.log(userName, email, hashedPassword);

};

export const login = (req, res) => {



}

export const logout = (req, res) => {



}