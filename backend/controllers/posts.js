const {Posts, Likes} = require('../models');
const fs = require('fs');



exports.getAllPost = async (req,res) => {
    const listOfPosts = await Posts.findAll({include: [Likes]});

    const likedPosts = await Likes.findAll({where: { userId: req.user.id}})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts} );
}

exports.getOnePost = async (req,res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post);

}

exports.createPost = async (req,res) => {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.json(post);
}

exports.deletePost = async (req,res) => {
    const postId = req.params.id;
    await Posts.destroy({
      where: {
        id: postId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
}

