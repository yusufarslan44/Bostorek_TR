const User = require("../models/User");
const { checkValidationErrors } = require("../utils");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email } = req.body

        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.status(400).json({ error: 'The Email is already exist' })
        }

        const user = await User.create(req.body)

        user.password = undefined
        return res
            .status(201)
            .json({ message: 'User created succesfully', user: user })

    } catch (error) {
        //Handle mongoose validation error
        if (error.name === 'ValidationError') {
            if (checkValidationErrors(error, res)) return
        } else {
            console.error("Erorr at register", error)
            return res.status(500).json({ error: 'Internal Server error' })
        }
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'The User not found' })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({ error: 'The Password incorret' })
        }

        //Create Token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });



        user.password = undefined
        return res
            .status(200)
            .json({ message: 'User logged in successfully', user, token })
    } catch (error) {
        console.error("Erorr at login", error)
        return res.status(500).json({ error: 'Internal Server error' })
    }
}


const getProtectedData = (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
};
const getUser = async (req, res) => {
    const id = req.user.id; // authenticateToken middleware'den gelen kullanıcı bilgisi
    const user = await User.findById(id)
    user.password = null
    res.json(user);
}

module.exports = {
    register,
    login,
    getProtectedData,
    getUser
}