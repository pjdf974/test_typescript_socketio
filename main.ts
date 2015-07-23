///<reference path="defroot/http.d.ts"/>
///<reference path="defroot/fs.d.ts"/>
///<reference path="defroot/url.d.ts"/>
///<reference path="defroot/path.d.ts"/>
///<reference path="defroot/mime.d.ts"/>
///<reference path="defroot/socket.io.d.ts"/>
///<reference path="defroot/global.d.ts"/>

import http  = require("http");
import fs    = require("fs");
import path  = require("path");
import mime  = require("mime");
import url   = require("url");
import sktio = require("socket.io");

var config = <Config>{
	port : 12345,
	hostname : "localhost",
	index : "index.html",
	static : "public"
};

var io = <Connexion>sktio(
	http.createServer(function(request, response){
		console.log(" ", request.method, request.url);
		var parsed = <UrlParsed>url.parse(request.url, true);
		if("/"===parsed.pathname){
			parsed.pathname = config.index;
		};
		fs.createReadStream(path.join(process.cwd(), config.static, parsed.pathname))
			.on("open", function(){
				response.writeHead(200, mime.lookup(parsed.pathname));
				this.pipe(response);			
			})
			.on("error", function(error){
				response.writeHead(404, mime.lookup[".txt"]);
				response.end("\n\n\n\nERREUR =\n"+error);
			});	
	}).listen(config.port, config.hostname, function(){
		console.log("\n  server listen at http://%s:%d", config.hostname, config.port);
	})
);

io.users = {};
io.ids   = {};

io.on("connection", function(socket){
	
	socket.emit("srv", {msg:"SERVEUR : Connexion réussie. Entrer un pseudo", cod:"LOG", users:io.users});
	
	socket.on("clt", function(data:Message){
		if("LOG"===data.cod){
			if(io.users[data.msg]){
				socket.emit("srv", {msg:"SERVEUR : Le pseudo '"+data.msg+"' est déjà utilisé. Choisir un autre"});
			}else{
				io.users[data.msg] = true;
				io.ids[socket.id] = data.msg;
				socket.emit("srv", {cod:"OK"});
				io.emit("srv", {msg:"SERVEUR : '"+data.msg+"' s'est identifié avec succès.", users:io.users});
			};
		}else{
			io.emit("srv", {msg:io.ids[socket.id]+" : "+data.msg});
		};
	});
	
	socket.on("disconnect", function(){
		var pseudo = io.ids[socket.id];
		delete io.ids[socket.id];
		delete io.users[pseudo];
		io.emit("srv", {msg:"SERVEUR : '"+pseudo+"' s'est déconnecté", users:io.users});
	});
	
});

