
declare class HttpServer{
	listen(port:number, hostname?:string, callback?:Function):HttpServer;
	listen(port:number, callback?:Function):HttpServer;
}

declare class Request{
	method:string;
	url:Object;
}

declare class Response{
	writeHead(code:number, mimetype:Object):void;
	end(arg:string):void;
}

interface HttpHandler{
	(request:Request, response?:Response):void;
}

declare module "http"{
	export function createServer(callback?:HttpHandler):HttpServer;
}