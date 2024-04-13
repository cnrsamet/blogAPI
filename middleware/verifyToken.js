/*
const invalidTokens = {}; // Geçersiz tokenlar

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token && invalidTokens[token] && new Date() < invalidTokens[token]) {
        return res.status(401).json({ message: "Bu oturum sonlandırılmıştır. Lütfen tekrar giriş yapın." });
    }

    // Eğer token kara listede değilse veya süresi dolmuşsa, isteği devam ettir
    next();
};
*/