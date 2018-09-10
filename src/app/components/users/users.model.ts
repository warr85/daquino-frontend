export class User{
	public id: number;
	public description: string;
	public membership?: string;
	public topics?: Array<string>;

	constructor(description: string, id:number, mem: string, topics?: Array<string>){
		this.id = id;
		this.description = description;
		this.membership = mem;
	}
}