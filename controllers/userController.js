const User = require('../models/Users');
const Users = require('../models/Users');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.getAllUsers = async (req, res) => {
    const users = await Users.find({});
    res.json(users);
};

exports.userCreate = async (req, res) => {
    const user = await Users.create(req.body);
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/api/users');
};

exports.updateUser = async (req, res) => {
    const upUser = await User.findOne({_id: req.params.id});
    if (!upUser) {
        return res.status(404).send({error: "Kullanıcı Bulunamadı."});
    }
    upUser.name= req.body.name;
    upUser.mail= req.body.mail;
    upUser.password= req.body.password;
    upUser.save();
    res.json({
        id: upUser._id,
        name: upUser.name,
        mail: upUser.mail
    })
};

exports.loginUser = async (req, res) => {
    try {
        // Kullanıcıyı e-posta adresine göre bul
        const user = await User.findOne({ mail: req.body.mail });
        if (!user) {
            return res.status(401).json({ message: 'Kullanıcı Bulunamadı!' });
        }

        // Şifreyi karşılaştır
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Lütfen Bilgilerinizi Kontrol ediniz.' });
        }

        // JWT oluştur
        const token = jwt.sign(
            {
                mail: user.mail,
                userId: user._id
            },
            secretKey,
            { expiresIn: '1h' }
        );
        

        res.status(200).json({
            message: 'Giriş Başarılı!',
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};