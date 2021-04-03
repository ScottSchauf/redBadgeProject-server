const router = require('express').Router();
const { UniqueConstraintError } = require('sequelize/lib/errors');
const {UserModel} = require("../models");

router.post("/register", async (req, res) => {
    let { firstName, lastName, email, password } = req.body.user;
    try {
    let User = await UserModel.create({
        firstName,
        lastName,
        email,
        password
    });

    res.status(201).json({
        message: "User successfully registered!",
        user: User
    });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email is already in use",
            });
        } else {
        res.status(500).json({
            message: "Failed to register user",
        });
        }
    }
});

router.post("/login", async (req, res) => {
    let {email, password} = req.body.user;

    try {
    let loginUser = await UserModel.findOne({
        where: {
            email: email,
        },
    });

    if (loginUser) {
    res.status(200).json({
        user: loginUser,
        message: "User successfully logged in!"
    });
    } else {
        res.status(401).json({
            message: "Login Failed!"
        });
    }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router;