const TokenBlacklist = require('../models/TokenBlackList');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const checkBlacklist = async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.split(" ").length < 2) {
        return res.status(401).json({ message: 'Öncelikle Giriş yapınız! (Token bulunamadı)' });
    }

    const token = req.headers.authorization.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userData = decoded;

        const tokenInBlacklist = await TokenBlacklist.findOne({ token });
        if (tokenInBlacklist) {
            return res.status(401).json({ message: 'Lütfen öncelikle Giriş yapınız. (Token Kullanılmıyor veya eksik)' });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Öncelikle Giriş Yapınız!'
        });
    }
};

module.exports = checkBlacklist;

module.exports = checkBlacklist;