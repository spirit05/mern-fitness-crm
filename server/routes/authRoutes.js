const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET || "secret.fitness_token";
const User = require("../models/user.js");
const router = express.Router();
let closeTime = 0;
let countWrongLogin = 0;

router.post("/", 
            async (req, res) => { 
                try {
                    const { login, password } = req.body;

                    const user = await User.findOne({ login });

                    if (!user) return res.status(404).json("Неверный логин или пароль");

                    const isMatch = password === user.password;

                    if (!isMatch) {
                        ++countWrongLogin;
                        
                        if (countWrongLogin > 3) {
                            if (closeTime === 0) {
                                    setTimeout(() => {
                                        countWrongLogin = 0;
                                        closeTime = 0;
                                    }, 360000);
                                    closeTime = Date.now() + 360000;
                                }                        
                            return res.status(400).json(`Превышено количество попыток. Попробуйте снова через ${((closeTime - Date.now()) / 60000).toFixed()} мин.`);
                        }
                        
                        return res.status(400).json("Неверный логин или пароль");
                    }

                    countWrongLogin = 0;

                    const token = jwt.sign(
                        { userId: user._id },
                        jwt_secret,
                        { expiresIn: "1h" }
                    ); 

                    res.json({ token, userId: user._id, fio: user.fio });
                } catch (e) {
                    res.status(500);
                }

});

module.exports = router;
