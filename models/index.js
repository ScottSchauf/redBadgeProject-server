const UserModel = require('./user');
const CollectionModel = require('./collection');
const ProfileModel = require('./profile');

UserModel.hasMany(CollectionModel);
UserModel.hasOne(ProfileModel);

CollectionModel.belongsTo(UserModel);

ProfileModel.belongsTo(UserModel);

module.exports = {
    UserModel,
    CollectionModel,
    ProfileModel
};