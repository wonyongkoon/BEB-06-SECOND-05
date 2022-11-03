var DataTypes = require("sequelize").DataTypes;
var _nft = require("./nft");
var _post = require("./post");
var _post_detail = require("./post_detail");
var _post_like = require("./post_like");
var _user = require("./user");

function initModels(sequelize) {
  var nft = _nft(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var post_detail = _post_detail(sequelize, DataTypes);
  var post_like = _post_like(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  post_detail.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_detail, { as: "post_details", foreignKey: "post_id"});
  post_like.belongsTo(post, { as: "post", foreignKey: "post_id"});
  post.hasMany(post_like, { as: "post_likes", foreignKey: "post_id"});
  nft.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(nft, { as: "nfts", foreignKey: "user_id"});
  post.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(post, { as: "posts", foreignKey: "user_id"});
  post.belongsTo(user, { as: "nickname_user", foreignKey: "nickname"});
  user.hasMany(post, { as: "nickname_posts", foreignKey: "nickname"});
  post_detail.belongsTo(user, { as: "nickname_user", foreignKey: "nickname"});
  user.hasMany(post_detail, { as: "post_details", foreignKey: "nickname"});
  post_like.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(post_like, { as: "post_likes", foreignKey: "user_id"});

  return {
    nft,
    post,
    post_detail,
    post_like,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
