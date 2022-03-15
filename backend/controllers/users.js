const {Users} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');


exports.createUser =  (req,res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json("succes");
    });
};

exports.loginUser = async (req,res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({where: {username: username}});

    if(!user) res.json({error : " user doesnt exist !"})

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error : "wrong password !"});

        const accessToken = sign({username: user.username, id: user.id}, "secret");
        res.json(accessToken);
    });
};

exports.checkToken = (req,res) => {
    res.json(req.user);
}