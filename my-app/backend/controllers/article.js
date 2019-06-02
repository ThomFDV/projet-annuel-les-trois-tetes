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
