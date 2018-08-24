export class User{
	public username: string;
	public membership: number;
	public group: number;
	public password: string;

	constructor(username: string, member: number, group: number, password: string){
		this.username = username;
		this.membership = member;
		this.group = group;
		this.password = password;
	}
}