const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.createUser = (req, res) => {
  const { username, password, email, phone } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      email: email,
      phone: phone,
    });
    res.json("succes");
  });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: " user doesnt exist !" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "wrong password !" });

    const accessToken = sign(
      { username: user.username, id: user.id, role: user.role},
      "secret"
    );
    res.json({ token: accessToken, username: username, role: user.role, id: user.id });
  });
};
exports.checkToken = (req, res) => {
  res.json(req.user);
};

exports.basicInfo = async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
};

exports.editPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
};


exports.deleteAccount = async (req, res) => {
  const userId = req.params.id;
  await Users.destroy({
    where: {
      id: userId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
};
