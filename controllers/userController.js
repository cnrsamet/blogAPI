const User = require('../models/Users');
const Users = require('../models/Users');

const bcrypt = require('bcrypt');



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