const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const jwtKey = process.env.SECRET_KEY;

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.sendStatus(403);

        jwt.verify(token.split(' ')[1], jwtKey, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({
            succeded: "false",
            erorr: error
        })
    }

};

module.exports = authenticateToken;