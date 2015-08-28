var Code = require('code'),
    Lab = require('lab'),
	Hapi = require('hapi'),
	server = require("../");



var lab = exports.lab = Lab.script();
var post;

lab.experiment('Posts', function () {

    lab.test("main endpoint lists posts ", function(done) {
        var options = {
            method: "GET",
            url: "/posts"
        };

        server.inject(options, function(response) {
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.payload).to.be.a.string();
            done();
        });


    });


    lab.test("single post", function(done) {
        var options = {
            method: "GET",
            url: "/posts/1"
        };

        server.inject(options, function(response) {
            var singleItem = JSON.parse(response.payload);
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(singleItem["title"]).to.equal("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
            done();
        });


    });



});
