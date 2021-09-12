const { Router } = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = Router();

router.post("/registration", async (req, res) => {
  try {
    const { name, lastName, number, password } = await req.body;
    const candidate = await User.findOne({number})
    if(candidate){
      return res.status(400).json({message: 'Пользователь уже сущетсвует', ok: false})
    }
    const user = new User({ name, lastName, number, password });
    await user.save();
    const token = jwt.sign(
      {
        userId: user.id,
      },
      "vapoltavecs",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/authorisation", async (req, res) => {
  try {
    const { number, password } = await req.body;
    const candidate = await User.findOne({ number: number });
    if (!candidate) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    if (candidate.password !== password) {
      return res.status(400).json({ message: "Пароли не совпадают" });
    }

    const token = jwt.sign(
      {
        userId: candidate.id,
      },
      "vapoltavecs",
      { expiresIn: "1h" }
    );
    return res.status(201).json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/auth", async (req, res) => {
  try {
    const { token } = await req.body;
    const decoded = jwt.verify(token, "vapoltavecs");
    console.log(decoded)
    if (decoded) {
      return res.status(200).json({ isCorrect: true });
    }
    
  } catch (e) {
    return res.status(400).json({ isCorrect: false });
  }
});

module.exports = router;
