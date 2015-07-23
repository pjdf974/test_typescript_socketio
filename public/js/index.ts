///<reference path="../../defroot/socket.io.d.ts"/>
///<reference path="../../defroot/global.d.ts"/>

var tMsg  = <HTMLInputElement>document.querySelector("#tMsg"),
	tLog  = <HTMLInputElement>document.querySelector("#tLog"),
	bMsg  = <HTMLInputElement>document.querySelector("#bMsg"),
	bLog  = <HTMLInputElement>document.querySelector("#bLog"),
	msgs  = <HTMLDivElement>document.querySelector("[class=messages]"),
	usrs  = <HTMLDivElement>document.querySelector("[class=users]"),
	label = <HTMLLabelElement>document.querySelector("[class=name] label");
	
onload = function(){
	
	var socket  = io();
		
	socket.on("srv", function(data:Message){
		if(data.msg){
			ajouter(data.msg);
		};
		if("LOG"===data.cod){
			tLog.disabled = false;
			bLog.disabled = false;
		};
		if("OK"===data.cod){
			label.style.color = "black";
			label.innerHTML = "Votre pseudo =";
			tLog.disabled = true;
			bLog.disabled = true;
			tMsg.disabled = false;
			bMsg.disabled = false;
		};
		if(data.users){
			// vider la div users
			while(usrs.firstChild){
				usrs.removeChild(usrs.firstChild);
			};
			// la remplir
			for(var user in data.users){
				ajouter(user, "user", usrs);
			};
		};
	});
	
	bLog.onclick = function(){
		if(tLog.value){
			socket.emit("clt", {msg:tLog.value.toUpperCase(), cod:"LOG"});
		}else{
			tLog.placeholder = "Pseudo ?"
		};
	};
	
	bMsg.onclick = function(){
		if(tMsg.value){
			socket.emit("clt", {msg:tMsg.value});
			tMsg.value = "";
		}else{
			tMsg.placeholder = "Il n'y a aucun message à envoyer";
		};
	};
};

function ajouter(arg:string, classname:string="message", container:HTMLDivElement=msgs){
	var elm = document.createElement("div");
	elm.className = classname;
	elm.innerHTML = arg;
	container.appendChild(elm);
	//container.scrollHeight = document.getElementsByClassName(classname).length;
	container.scrollTop = container.scrollHeight;
};
