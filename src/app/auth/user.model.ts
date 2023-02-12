export class UserModel{
  constructor(private email:string,private id:string,
              private token:string, private tokenExpirationDate:Date) {
  }

  get Token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate)
      return null;
    return this.token;
  }
}
