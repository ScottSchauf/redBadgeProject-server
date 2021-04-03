const {DataTypes} = require("sequelize");
const db = require("../db");

const Collection = db.define("collection", {
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    director: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ref: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hasSeen: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    review: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Collection