var Hapi = require('hapi');
var Good = require('good');
var Posts = require('./posts');
var Joi = require('joi');
var _ = require('lodash');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/posts',
    handler: function (request, reply) {

        reply(Posts);
    }
});

server.route({
    method: 'GET',
    path: '/posts/{id}',
    config: {
        validate: {
            params: {
                id: Joi.number().required()
            }
        }
    },
    handler: function (request, reply) {

        var post = _.find(Posts, { 'id': request.params.id });
        reply(post);
    }
});

server.register([{
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        },
		{
			reporter: require('good-file'),
			events: { ops: '*' },
			config: {
				path: './logs',
				prefix: 'hapi-process',
				rotate: 'daily'
			}
		},
		{
			reporter: require('good-file'),
			events: { response: '*' },
			config: {
				path: './logs',
				prefix: 'hapi-requests',
				rotate: 'daily'
			}
		},
		{
			reporter: require('good-file'),
			events: { error: '*' },
			config: {
				path: './logs',
				prefix: 'hapi-error',
				rotate: 'daily'
			}
		}]
    }

},
{
    register: require('./routes/comments')

}], function (err) {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    if (!module.parent) {
        server.start(function() {
            console.log("Server started", server.info.uri);
        });
    }
});

module.exports = server;
