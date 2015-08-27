var Joi = require('joi');
var CommentHandlers = require('./../handlers/comments');

exports.register = function (server, options, next) {

    server.route({
        path: '/comments',
        method: ['GET'],
        config: {
            auth: false
        },
        handler: CommentHandlers.list
    });

    server.route({
        path: '/comments/{postId}',
        method: ['GET'],
        config: {
            auth: false,
            validate: {
                params: {
                    postId: Joi.number().required()
                }
            }
        },
        handler: CommentHandlers.byPostId
    });




    next();
};


exports.register.attributes = {
    name: 'comment-routes',
    version: '1.0.0'
};
