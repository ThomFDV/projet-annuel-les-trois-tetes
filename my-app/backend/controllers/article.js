"use strict";

const Article = require("../models/article");
const User = require("../models/user");

/*
    Création d'un article
 */
exports.create = async (req, res, next) => {

  const title = req.body.title;
  const content = req.body.content;
  const creator = req.user.email;

  try {
    const article = new Article({
      title,
      content,
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

/*
    Récuperation des articles
 */
exports.getArticle = async (req, res) => {
  const articles = await Article.find({}).sort({updatedAt: "desc"});
  res.json(articles);
};

/*
    Récuperation d'un article en fonction de son id passé en parametre
 */
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

    const comment = {
      email,
      title,
      content
    };
    doc.comments.push(comment);
    doc.save();
    return res.json(comment).status(201).end();
  });
};
