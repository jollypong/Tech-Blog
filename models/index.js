const User = require('./Users');
const Post = require('./Posts');
const Comment = require ('./Comments');

User.hasMany(Post, {
    foreignKey: 'user_id'
}); //might not need onDelete: cacade here since no function to delete user

User.hasMany(Comment, {
    foreignKey: 'user_id'
}); //might not need onDelete: cacade here since no function to delete user

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

Post.belongsTo(User, {
    foreignKey: 'user_id', 
    onDelete: "cascade"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id', 
    onDelete: "cascade"
})

Comment.belongsTo(User, {
    foreignKey: 'user_id', 
    onDelete: "cascade"
}); 

module.exports = { User, Post, Comment }; 