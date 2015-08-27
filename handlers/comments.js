var Comments = require('./comments.json');
var _ = require('lodash');

exports.list = function (request, reply){

    reply(Comments);

};

exports.byPostId = function (request,reply){

    var comment = _.where(Comments, { 'postId': request.params.postId });
    reply(comment);
};
