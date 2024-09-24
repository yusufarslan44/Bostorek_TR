const { isValidİd, findDocumentById, } = require("../utils");
const User = require("../models/User");



const updateUser = async (req, res) => {
    const { username, email, password } = req.body
    const id = req.user.id
    if (isValidİd(id, res)) return

    try {

        const user = await findDocumentById(User, id, res);
        if (!user) return;

        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;

        await user.save();
        res.status(200).json({ message: 'The user details udated successfully' })
    } catch (error) {
        console.error("Erorr at not user details", error)
        return res.status(500).json({ error: 'Internal Server error' })
    }
}

const getUser = async (req, res) => {
    const id = req.user.id; // authenticateToken middleware'den gelen kullanıcı bilgisi
    const user = await User.findById(id)
    user.password = null
    res.json(user);
}


module.exports = {
    updateUser, getUser
}