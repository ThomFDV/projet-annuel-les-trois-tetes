"use strict";

const mongoose = require("mongoose");
const Theme = require("../models/theme");
const User = require("../models/user");
const UserTheme = require("../models/userTheme");


/*
    Création d'un theme sans cours
 */
exports.create = async (req, res, next) => {

    const title = req.body.title.trim();
    if (title.length > 2) {
        try {
            const theme = await new Theme({
                title
            });
            await theme.save();
            res.status(201).json({message: "Theme créé !"}).end();

        } catch (e) {
            res.status(409).json({
                message: "Problème lors de l'ajout dans la bdd"
            }).end();
        }
    } else {
        res.status(400).json({
            code: "error_validation",
            message: "Le titre du theme doit faire au moins 2 caractères"
        });
    }
};

/*
    Récuperation de tous les themes
 */
exports.getThemes = async (req, res) => {

    let themes = await Theme.aggregate([
        {$project: {"courses.content": 0}}
    ]);
    res.json(themes);
};

/*
    Récuperation d'un theme en fonction de son id passé en parametre
 */
exports.getThemeById = async (req, res) => {

    const themeId = req.params.id;

    const theme = await Theme.aggregate([
        {$match: {"_id": mongoose.Types.ObjectId(themeId)}},
        {$project: {"courses.content": 0}}

    ]);
    res.json(theme);

    //{$project : {"courses.content": 0}}
};

/*
    Ajout d'un cours dans un theme en fonction de l'id du theme
    et incrementation de l'orderId en fonction du total des cours du theme
 */
exports.addCourse = async (req, res) => {
    let order = await this.countCourse(req, res);
    order = order[0].numberCourses + 1;

    const theme = await Theme.findById(req.params.id, (err, doc) => {
        if (doc === null || err) return res.status(409).json({
            message: "Problème dans la bdd"
        }).end();

        const title = req.body.title.trim();
        const content = req.body.content.trim();
        const orderId = order;
        const creator = req.user.email;

        if (title.length > 2) {
            if (content.length > 2) {
                const course = {
                    title,
                    orderId,
                    content,
                    creator
                };
                doc.courses.push(course);
                doc.save();
                return res.json(course).status(201).end();
            } else {
                res.status(400).json({
                    code: "error_validation",
                    message: "Le contenu du cours doit faire au moins 2 caractères"
                });
            }
        } else {
            res.status(400).json({
                code: "error_validation",
                message: "Le titre du cours doit faire au moins 2 caractères"
            });
        }
    });
};

/*
    Récuperation du nombre de cours total d'un theme en fonction de l'id du theme
 */
exports.countCourse = async (req, res) => {
    const themeId = req.params.id;

    try {
        let num = await Theme.aggregate([

            {
                $match: {
                    "_id": mongoose.Types.ObjectId(themeId)
                }
            },
            {
                $project: {
                    "title": "$title",
                    "numberCourses": {
                        $cond: {
                            if: {
                                $isArray: "$courses"
                            },
                            then: {
                                $size: "$courses"
                            },
                            else: 0
                        }
                    }
                }
            }
        ]);
        return num;
    } catch (err) {
        return err;
    }
};

/*
    Récupération d'un theme en fonction de son id
    et d'un seul cours de ce theme en fonction de son id
 */
exports.getCourse = async (req, res) => {

    const themeId = req.params.themeId;
    const courseId = req.params.courseId;

    try {
        let course = await Theme.aggregate([
            {$match: {"_id": mongoose.Types.ObjectId(themeId)}},
            {$unwind: "$courses"},
            {$match: {"courses._id": mongoose.Types.ObjectId(courseId)}}
        ]);
        return res.json(course).status(200).end();
    } catch (e) {
        return res.status(409).json({
            message: "Problème dans la bdd"
        }).end();
    }
};

/*
    Récupere le cours en fonction du themeId et courseId
    Vérifie que l'orderId du cours pour ce theme est inferieur ou egal à l'orderId du user
    S'il est inferieur: renvoie le cours
    S'il est egal:  incremente l'orderId de 1,
                    met a jour les statisiques du user (nombre de cours lu incrementés de 1)
                    et renvoie le cours
    S'il est superieur: renvoie une interdiction
 */
exports.checkUserTheme = async (req, res) => {

    const userId = req.user._id;
    const themeId = req.params.themeId;
    const courseId = req.params.courseId;


    const theme = await Theme.aggregate([
        {$match: {"_id": mongoose.Types.ObjectId(themeId)}},
        {$unwind: "$courses"},
        {$match: {"courses._id": mongoose.Types.ObjectId(courseId)}}
    ]);

    let orderIdTheme = theme[0].courses.orderId;


    let userTheme = await UserTheme.aggregate([
        {$match: {"themeId": mongoose.Types.ObjectId(themeId), "userId": mongoose.Types.ObjectId(userId)}}
    ]);

    if (orderIdTheme < userTheme[0].orderId) { // si l'orderId du thème est inferieur à l'orderId du user

        this.getCourse(req, res);

    } else if (orderIdTheme === userTheme[0].orderId) { // si l'orderId du theme est egal à l'orderId du user

        try {

            const userTheme = await UserTheme.updateOne(
                {userId: userId, themeId: themeId},
                {
                    $inc:
                        {orderId: 1}
                }
            );

            const user = await User.updateOne(
                {_id: userId},
                {
                    $inc:
                        {"statistics.coursesRead": 1}
                }
            );

            this.getCourse(req, res);

        } catch (e) {
            return res.status(409).json({
                message: "Problème lors de l'ajout dans la bdd"
            }).end();
        }
    } else if (orderIdTheme > userTheme[0].orderId) { // si l'orderId du theme est supérieur à l'orderId du user

        return res.status(403).json({
            message: "Vous n'avez pas accès à ce cours"
        }).end();
    }
};

/*
    Verifie si le user a deja lu un cours du theme en fonction du themeId et userId
    Si ce n'est pas le cas il initialise le userTheme avec un orderId de 1 (pour l'accès au premier cours du theme) et renvoie le userTheme
    Sinon il renvoie simplement le userTheme

 */
exports.getUserTheme = async (req, res) => {
    const userId = req.user._id;
    const themeId = req.params.id;

    let userTheme = await UserTheme.aggregate([
        {$match: {"themeId": mongoose.Types.ObjectId(themeId), "userId": mongoose.Types.ObjectId(userId)}}
    ]);

    if (userTheme[0] === undefined) { // si le user n'a ouvert encore aucun cours du theme

        try {
            const userTheme = await new UserTheme({
                userId,
                themeId,
                orderId: 1,
            });
            await userTheme.save();

            return res.status(201).json(userTheme);

        } catch (e) {

            return res.status(409).json({
                message: "Problème lors de l'ajout dans la bdd"
            }).end();
        }
    } else {
        return res.status(200).json(userTheme);
    }

};

exports.removeTheme = async (req, res) => {

    const themeId = req.params.id;

    const theme = await Theme.findById(themeId, (err, doc) => {
        if (doc === null || err) return res.json({"message": `Le theme ${themeId} n'a pas pu etre supprime`}).status(409).end();
        doc.remove();
        return res.json({"message": `Le theme ${themeId} a bien ete supprime`}).status(200).end();
    });
};
