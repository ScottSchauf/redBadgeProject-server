const router = require('express').Router();
const {UserModel} = require("../models");
const {CollectionModel} = require('../models');
const {ProfileModel} = require("../models");
const User = require('../models/user');
const admin = require("../middleware/admin");

router.get('/practice', (req, res) => {
    res.send("The practice route works!")
});

// GET: Get a list of all Users
router.get("/userList", async (req, res) => {
    try {
        const listOfUsers = await UserModel.findAll();
        res.status(200).json({
            users: listOfUsers,
        });
    } catch (err) {
        res.status(500).json({
            message: "Couldn't get a list of Users",
        });
        console.log(err)
    }
});

// PUT: Edit a User's Collection
router.put("/editEntry/:id", admin, async (req, res) => {
    const { ref, hasSeen, rating, review } = req.body;
    const filmId = req.params.id;
    
    const query = {
        where: {
            id: filmId,
        }
    };

    const updatedEntry = {
        ref: ref,
        hasSeen: hasSeen,
        rating: rating,
        review: review
    };

    try {
        const update = await CollectionModel.update(updatedEntry, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// PUT: Edit a User's Profile
router.put("/editProfile/:id", admin, async (req, res) => {
    const { birthday, bio, favFilm, favGenre } = req.body;
    const profileId = req.params.id;
    
    const query = {
        where: {
            id: profileId,
        }
    };

    const editedProfile = {
        birthday: birthday,
        bio: bio,
        favFilm: favFilm,
        favGenre: favGenre
    };

    try {
        const update = await ProfileModel.update(editedProfile, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// DELETE: Delete a User's Profile
router.delete("/deleteProf/:id", admin, async (req, res) => {
    const profileId = req.params.id;

    try {
        const query = {
            where: {
                id: profileId,
            }
        };

        await ProfileModel.destroy(query);
        res.status(200).json({ message: "Profile removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// DELETE: Delete a User's Collection Entry
router.delete("/deleteEntry/:id", admin, async (req, res) => {
    const filmId = req.params.id;

    try {
        const query = {
            where: {
                id: filmId,
            }
        };

        await CollectionModel.destroy(query);
        res.status(200).json({ message: "Film removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


// DELETE: Delete a User
router.delete("/deleteUser/:id", admin, async (req, res) => {
    const userId = req.params.id;

    try {
        const query = {
            where: {
                id: userId,
            }
        };

        await UserModel.destroy(query);
        res.status(200).json({ message: "User removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;