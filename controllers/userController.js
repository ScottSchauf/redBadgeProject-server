const router = require('express').Router();
const { UniqueConstraintError } = require('sequelize/lib/errors');
const {UserModel} = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// POST: Register a User
router.post("/register", async (req, res) => {
    console.log(req.body);
    let { firstName, lastName, email, password, isAdmin } = req.body.user;
    try {
    let User = await UserModel.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 13),
        isAdmin,
    });

    let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

    res.status(201).json({
        message: "User successfully registered!",
        user: User,
        sessionToken: token
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


// POST: Log a User In
router.post("/login", async (req, res) => {
    let {email, password} = req.body.user;

    try {
    let loginUser = await UserModel.findOne({
        where: {
            email: email,
        },
    });

    if (loginUser) {

        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison) {
        let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

    res.status(200).json({
        user: loginUser,
        message: "User successfully logged in!",
        sessionToken: token
    });
    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        })
    }
    } else {
        res.status(401).json({
            message: "Incorrect email or password"
        });
    }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});


// GET: Get a User by ID
router.get("/:id", async (req, res) => {
    try {
        const anotherUser = await UserModel.findAll({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(anotherUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;