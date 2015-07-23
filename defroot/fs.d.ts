declare class Stream{
	on(event:string, callback:Function):Stream;
}

declare module "fs"{
	export function createReadStream(file:string):Stream;
}