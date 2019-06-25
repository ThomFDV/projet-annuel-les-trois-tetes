"use strict";

const Article = require("../models/article");
const User = require("../models/user");

exports.create = async (req, res, next) => {

  const title = req.body.title;
  const content = req.body.content;
  const type = req.body.type;
  const creator = req.user.email;

  try {
    const article = new Article({
      title,
      content,
      type,
      creator
    });
    await article.save();
    return res.status(201).json({"message": "Article créé !"}).end();
  } catch {
    res.status(409).json({
      message: "Problème lors de l'ajout dans la bdd"
    }).end();
  }
};

exports.getArticle = async (req, res) => {
  const articles = await Article.find({ type: "article"}).sort({updatedAt: "desc"});
  res.json(articles);
};

exports.getCours = async (req, res) => {
  const cours = await Article.find({ type: "cours"}).sort({updatedAt: "desc"});
  res.json(cours);
};

exports.getArticleById = async (req, res) => {

  const article = await Article.findById(req.params.id, (err, doc) => {
    if (err) return err;
  });
  res.json(article);
};

exports.addComment = async (req, res) => {

  const article = await Article.findById(req.params.id, (err, doc) => {
    if (err) return err;
    const email = req.user.email;
    const title = req.body.title;
    const content = req.body.content;

    doc.comments.push({
      email,
      title,
      content
    });
    doc.save();
  });
};
