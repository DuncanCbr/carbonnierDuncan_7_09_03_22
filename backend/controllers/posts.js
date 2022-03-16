const {Posts, Likes} = require('../models');
const fs = require('fs');


exports.getAllPost = async (req,res) => {
    const listOfPosts = await Posts.findAll({include: [Likes]})
    res.json(listOfPosts);
}

exports.getOnePost = async (req,res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post);

}

exports.createPost = async (req,res) => {
    const post = req.body
    await Posts.create(post);
    res.json(post);
}

