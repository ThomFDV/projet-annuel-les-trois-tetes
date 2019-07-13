"use strict";

const mongoose = require("mongoose");
const Article = require("../models/article");
const User = require("../models/user");
const Socket = require("./socket");

/*
    Création d'un article
 */
exports.create = async (req, res, next) => {

    const title = req.body.title.trim();
    const content = req.body.content.trim();
    const creator = req.user.email;

    if (title.length > 2) {
        if (content.length > 2) {
            try {
                const article = new Article({
                    title,
                    content,
                    creator
                });
                await article.save();
                Socket.io.path('/article').emit('article', article);

                return res.status(201).json({message: "Article créé !"}).end();
            } catch (error) {
                console.log(error);
                res.status(409).json({
                    code: "error_insertion",
                    message: "Problème lors de l'ajout dans la bdd"
                }).end();
            }
        } else {
            res.status(400).json({
                code: "error_validation",
                message: "Le contenu de l'article doit faire au moins 2 caractères"
            });
        }
    } else {
        res.status(400).json({
            code: "error_validation",
            message: "Le titre de l'article doit faire au moins 2 caractères"
        });
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
            const title = req.body.title.trim();
            const content = req.body.content.trim();

            if (title.length > 2) {
                if (content.length > 2) {
                    const comment = {
                        email,
                        title,
                        content
                    };
                    if (doc === null) return res.json({"message": `Le commentaire n'a pas pu etre ajoute`}).status(409).end();
                    doc.comments.push(comment);
                    doc.save();
                    return res.json(comment).status(201).end();
                } else {
                    res.status(400).json({
                        code: "error_validation",
                        message: "Le contenu du commentaire doit faire au moins 2 caractères"
                    });
                }
            } else {
                res.status(400).json({
                    code: "error_validation",
                    message: "Le titre du commentaire doit faire au moins 2 caractères"
                });
            }
        });
    } catch (e) {
        return res.status(409).json({
            message: `Le commentaire n'a pas pu etre ajoute`
        }).end();
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

exports.removeComment = async (req, res) => {

    const articleId = req.params.articleId;
    const commentId = req.params.commentId;


    const article = await Article.aggregate([
        {$match: {"_id": mongoose.Types.ObjectId(articleId)}},
        {$unwind: "$comments"},
        {$match: {"comments._id": mongoose.Types.ObjectId(commentId)}},

    ]);


    // article[0].comments.remove();


    return res.json(article).status(200).end();


    // const article = await Article.findById(articleId, (err, doc) => {
    //     if (doc === null || err) return res.json({"message": `L'article ${articleId} n'a pas pu etre supprime`}).status(409).end();
    //     doc.remove();
    //     return res.json({"message": `L'article ${articleId} a bien ete supprime`}).status(200).end();
    // });

};
