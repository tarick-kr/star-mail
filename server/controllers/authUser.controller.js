const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const keys = require('../keys');
const User = require('../models/user.model');

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    res.status(409).json({ message: 'Пользователь с таким email уже существует' });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      date: req.body.date,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, salt),
      email: req.body.email,
      subscription: req.body.subscription,
    });
    await user.save();
    res.status(201).json(user);
  }
};
module.exports.loginUser = async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });
  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
      }, keys.JWT, { expiresIn: 60 * 60 * 3 });
      await res.status(200).json(token);
    } else {
      res.status(404).json({ message: 'Пользователь не найден. Введите правильный e-mail и пароль.' });
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден. Введите правильный e-mail и пароль.' });
  }
};
