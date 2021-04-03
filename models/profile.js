const {DataTypes} = require("sequelize");
const db = require("../db");

const Profile = db.define("profile", {
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favFilm: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    favGenre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Profile