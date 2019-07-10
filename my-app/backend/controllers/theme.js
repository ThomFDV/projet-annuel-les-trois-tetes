"use strict";

const mongoose = require("mongoose");
const Theme = require("../models/theme");
const User = require("../models/user");
const UserTheme = require("../models/userTheme");

exports.create = async (req, res, next) => {

    const title = req.body.title;

    try {
        const theme = await new Theme({
            title
        });
        await theme.save();
        res.status(201).json({"message": "Theme créé !"}).end();

    } catch(e) {
        res.status(409).json({
            message: "Problème lors de l'ajout dans la bdd"
        }).end();
    }
};

exports.getThemes = async (req, res) => {
    await Theme.find({}, function (err, themes){
        res.json(themes);
    })

};

exports.getThemeById = async (req, res) => {

    const themeId = req.params.id;

    const theme = await Theme.findById(themeId, (err, doc) => {
        if (err) return err;
    });
    res.json(theme);


};

exports.addCourse = async (req, res) => {
    let order = await this.countCourse(req, res);
    order = order[0].numberCourses + 1;

    const theme = await Theme.findById(req.params.id, (err, doc) => {
        if (err) return err;
        try {

            const title = req.body.title;
            const content = req.body.content;
            const orderId = order;
            const creator = req.user.email;

            const course = {
                title,
                orderId,
                content,
                creator
            };
            doc.courses.push(course);
            doc.save();
            return res.json(course).status(201).end();

        } catch(err){
            res.status(409).json({
                message: "Problème lors de l'ajout dans la bdd"
            }).end();
        }

    });
};

exports.countCourse = async (req, res) => {
    const themeId = req.params.id;

    try {
    let num = await Theme.aggregate([

        {$match: {
                "_id": mongoose.Types.ObjectId(themeId)
            }},
        {$project: {
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
            }}
        ]);
    return num;
    } catch(err){
        return err;
    }
};

exports.getCourse = async (req, res) => {

    const themeId = req.params.themeId;
    const courseId = req.params.courseId;

    try {
        let course = await Theme.aggregate([
            {$match: {"_id":mongoose.Types.ObjectId(themeId)}},
            {$unwind: "$courses"},
            {$match: {"courses._id":mongoose.Types.ObjectId(courseId)}}
        ]);
        return res.json(course).status(200).end();
    }
    catch (e) {
        res.status(409).json({
            message: "Problème dans la bdd"
        }).end();
    }
};

exports.checkUserTheme = async (req, res) => {

    const userId = req.user._id;
    const themeId = req.params.themeId;
    const courseId = req.params.courseId;

    const theme = await Theme.aggregate([
        {$match: {"_id":mongoose.Types.ObjectId(themeId)}},
        {$unwind: "$courses"},
        {$match: {"courses._id":mongoose.Types.ObjectId(courseId)}}
    ]);

    let orderIdTheme = theme[0].courses.orderId;

    let userTheme = await UserTheme.aggregate([
        {$match: {"themeId":mongoose.Types.ObjectId(themeId), "userId":mongoose.Types.ObjectId(userId)}}
    ]);


    if(orderIdTheme < userTheme[0].orderId) { // si l'orderId du thème est inferieur à l'orderId du user

        this.getCourse(req, res);
    }
    else if(orderIdTheme === userTheme[0].orderId) { // si l'orderId du theme est egal à l'orderId du user

        try {

            const userTheme = await UserTheme.updateOne(

                { userId: userId, themeId: themeId },
                { $inc:
                    {orderId: 1}
                }
            );

            const user = await User.updateOne(

                { _id: userId},
                { $inc:
                    {"statistics.coursesRead": 1}
                }
            );

            this.getCourse(req, res);

        } catch(e) {
            res.status(409).json({
                message: "Problème lors de l'ajout dans la bdd"
            }).end();
        }
    }
    else if(orderIdTheme > userTheme[0].orderId) { // si l'orderId du theme est supérieur à l'orderId du user

        res.status(403).json({
            message: "Vous n'avez pas accès à ce cours"
        }).end();
    }
};

exports.getUserTheme = async (req, res) => {
    const userId = req.user._id;
    const themeId = req.params.id;

    let userTheme = await UserTheme.aggregate([
        {$match: {"themeId":mongoose.Types.ObjectId(themeId), "userId":mongoose.Types.ObjectId(userId)}}
    ]);

    if(userTheme[0] === undefined) { // si le user n'a ouvert encore aucun cours du theme

        try {
            const userTheme = await new UserTheme({
                userId,
                themeId,
                orderId: 1,
            });
            await userTheme.save();

            res.status(201).json(userTheme);

        } catch(e) {

            res.status(409).json({
                message: "Problème lors de l'ajout dans la bdd"
            }).end();
        }
    }
    else {
        res.status(200).json(userTheme);
    }

};
