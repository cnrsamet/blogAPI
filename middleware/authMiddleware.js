 const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Öncelikle Giriş Yapınız!'
        });
    }
};

/*
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const invalidTokens = {}; // Geçersiz tokenlar

module.exports = (req, res, next) => {
    // 'Authorization' başlığının varlığını kontrol et
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Öncelikle Giriş Yapınız!'
        });
    }

    try {
        // Bearer token'ı ayıklama
        const token = req.headers.authorization.split(" ")[1];

        // Token'ın geçersiz token'lar listesinde olup olmadığını kontrol et
        if (invalidTokens[token] && invalidTokens[token] > new Date()) {
            return res.status(401).json({ message: "Oturumunuz sonlandırılmıştır. Lütfen tekrar giriş yapın." });
        }

        // JWT doğrulama
        const decoded = jwt.verify(token, secretKey);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Öncelikle Giriş Yapınız!'
        });
    }
};
*/