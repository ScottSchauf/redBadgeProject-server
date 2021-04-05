const {DataTypes} = require("sequelize");
const db = require("../db");

const Profile = db.define("profile", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
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