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
    try {
        const articles = await Article.find({}).sort({updatedAt: "desc"});
        return res.json(articles);
    } catch (e) {
        return res.status(409);
    }

};

/*
    Récuperation d'un article en fonction de son id passé en parametre
 */
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id, (err, doc) => {
            if (err) return err;
        });
        return res.json(article);
    } catch (e) {
        return res.status(409);
    }

};

exports.addComment = async (req, res) => {
    try {
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
            if (doc === null) return res.json({"message": `Le commentaire n'a pas pu etre ajoute`}).status(409).end();
            doc.comments.push(comment);
            doc.save();
            return res.json(comment).status(201).end();
        });
    } catch (e) {
        return res.json({"message": `Le commentaire n'a pas pu etre ajoute`}).status(409).end();
    }

};


exports.removeArticle = async (req, res) => {

    const articleId = req.params.id;

    const article = await Article.findById(articleId, (err, doc) => {
        if (doc === null || err) return res.json({"message": `L'article ${articleId} n'a pas pu etre supprime`}).status(409).end();
        doc.remove();
        return res.json({"message": `L'article ${articleId} a bien ete supprime`}).status(200).end();
    });

};
