///<reference path="http.d.ts"/>

declare class Socket{
	on(event:string, callback:Function):void;
	emit(event:string, message:Message):void;
	public id:string;
}

declare class Connexion extends Socket{
	on(event:string, callback:SocketInterface);
	on(event:"connection", callback:SocketInterface);
	public users:Object;
	public ids:Object;
}

interface SocketInterface{
	(socket:Socket):void;
}

declare function io():Socket;

declare module "socket.io"{
	function sk(arg:HttpServer):Connexion;
	
	export = sk;
}