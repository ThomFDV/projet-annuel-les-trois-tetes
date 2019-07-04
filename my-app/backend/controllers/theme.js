"use strict";

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

    const theme = await Theme.findById(req.params.id, (err, doc) => {
        if (err) return err;
        try {
            const title = req.body.title;
            const content = req.body.content;
            const orderId = req.body.orderId;
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
