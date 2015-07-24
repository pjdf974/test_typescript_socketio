interface Config{
	port:number;
	hostname:string;
	index:string;
	static:string;
}

interface UrlParsed{
	pathname:string;
}

declare var process:{
	cwd():string;
}

interface Message{
	msg?:string;
	cod?:string;
	users?:Object;
}