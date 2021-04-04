const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const {ProfileModel} = require("../models");

router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route for profiles!')
});

// GET: Get Your User Profile
router.get("/mine", validateJWT, async (req, res) => {
    const id = req.user.id;
    try {
        const userProfile = await ProfileModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userProfile);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET: Get another user's Profile
router.get("/:id", async (req, res) => {
    try {
        const anotherProfile = await ProfileModel.findAll({
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(anotherProfile);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// POST: Create a User Profile
router.post('/create', validateJWT, async (req, res) => {
    const { birthday, bio, favFilm, favGenre } = req.body.profile;
    const { id } = req.user;
    const profileEntry = {
        userId: req.user.id,
        birthday,
        bio,
        favFilm,
        favGenre,
        owner: id
    }
    try {
        const newProfile = await ProfileModel.create(profileEntry);
        res.status(200).json(newProfile);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// PUT: Update your Profile
router.put('/update/:id', validateJWT, async (req, res) => {
    const { birthday, bio, favFilm, favGenre } = req.body;
    const profileId = req.params.id;
    const ownerId = req.user.id;

    const query = {
        where: {
            id: profileId,
            userId: ownerId
        }
    };

    const updatedProfile = {
        birthday: birthday,
        bio: bio,
        favFilm: favFilm,
        favGenre: favGenre
    };

    try {
        const update = await ProfileModel.update(updatedProfile, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// DELETE: Delete your Profile
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const profileId = req.params.id;

    try {
        const query = {
            where: {
                id: profileId,
                userId: userId
            }
        };

        await ProfileModel.destroy(query);
        res.status(200).json({ message: "Profile removed!" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;