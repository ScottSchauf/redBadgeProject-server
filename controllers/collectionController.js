const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const {CollectionModel} = require('../models');

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route for collections!')
});

// GET: GET YOUR COLLECTION
router.get("/mine", validateJWT, async (req, res) => {
    const id = req.user.id;
    try {
        const userCollection = await CollectionModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userCollection);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(req.user.id);
        console.log(err);
    }
});

// GET: GET A USER'S COLLECTION BY ID
router.get("/:id", async (req, res) => {
    try {
        const anotherCollection = await CollectionModel.findAll({
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(anotherCollection);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(req.params.id);
    }
});

// POST: ADD A FILM
router.post('/add', validateJWT, async (req, res) => {
    const { title, year, director, genre, ref, hasSeen, rating, review } = req.body.collection;
    const { id } = req.user;
    const addFilm = {
        userId: req.user.id,
        title,
        year,
        director,
        genre,
        ref,
        hasSeen,
        rating,
        review,
        owner: id
    }
    try {
        const newFilm = await CollectionModel.create(addFilm);
        res.status(200).json(newFilm);
    } catch (err) {
        res.status(500).json({ error: err });
    }

});

// PUT: EDIT AN ENTRY
router.put('/update/:id', validateJWT, async (req, res) => {
    const { ref, hasSeen, rating, review } = req.body;
    const filmId = req.params.id;
    const ownerId = req.user.id;

    const query = {
        where: {
            id: filmId,
            userId: ownerId
        }
    };

    const updatedFilm = {
        ref: ref,
        hasSeen: hasSeen,
        rating: rating,
        review: review
    };

    try {
        const update = await CollectionModel.update(updatedFilm, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// DELETE AN ENTRY
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const filmId = req.params.id;

    try {
        const query = {
            where: {
                id: filmId,
                userId: userId
            }
        };

        await CollectionModel.destroy(query);
        res.status(200).json({ message: "Film removed!" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;