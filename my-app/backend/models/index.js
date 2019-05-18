'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');


let sequelize;
if (config.use_env_variable) {

    sequelize = new Sequelize(process.env[config.use_env_variable], config, {
        define: {
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    });
} else {
    console.log("env :", env);
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        define: {
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    });
}


const Article = sequelize.define('article', require('./article'), {
    paranoid: true,
    underscored: true
});
const User = sequelize.define('user', require('./user'), {
    paranoid: true,
    underscored: true
});
Article.belongsTo(User);

const Tag = sequelize.define('tag', require('./tag'), {
    paranoid: true,
    underscored: true
});

const TagArticle = sequelize.define('tagArticle', {
});

Tag.belongsToMany(Article, {through: TagArticle});
Article.belongsToMany(Tag, {through: TagArticle});



sequelize.authenticate().then(() => {
    return sequelize.sync(/* {
        force: true
    }*/);
}); 

module.exports = {
    sequelize,
    Article,
    User,
    Tag,
    TagArticle
};
