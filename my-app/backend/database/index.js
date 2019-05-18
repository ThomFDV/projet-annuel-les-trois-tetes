'use strict';

const models = require('/../models');
models.sequelize.authenticate().then(() => {
    return models.sequelize.sync(/*{
        force: true
    }*/);
});
