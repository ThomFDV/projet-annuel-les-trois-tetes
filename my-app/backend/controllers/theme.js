"use strict";

const mongoose = require("mongoose");
const Theme = require("../models/theme");
const User = require("../models/user");

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

    const theme = await Theme.findById(req.params.id, (err, doc) => {
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
    let number = await Theme.aggregate([

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
    return number;
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
