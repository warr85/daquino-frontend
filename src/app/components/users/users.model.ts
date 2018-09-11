export class User{
	public id?: number;
	public description: string;
	public password?: string;
	public membership?: string;
	public topics?: Array<string>;
	public iduds006?: {
		description: string,
		id: number
	};

	constructor(description: string, id?:number, mem?: string, password?:string, topics?: Array<string>, userStatus?: {description: string, id: number}){
		this.id = id;
		this.description = description;
		this.membership = mem;
		this.password = password;
		this.iduds006 = userStatus;
	}
}