const { Posts, Likes } = require("../models");

exports.getAllPost = async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
};

exports.getOnePost = async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
};

exports.createPost = async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
};

exports.getPostsByUsers = async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
};

exports.editTitle = async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });

  res.json(newTitle);
};

exports.editBody = async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({postText: newText }, { where: { id: id } });

  res.json(newText);
};

