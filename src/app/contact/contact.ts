export class Contact {
  constructor(
    public id?: string,
    public csrf?: string,
    public ip?:string,
    public name?: string,
    public phone?: string,
    public email?: string,
    public message?: string
  ) {}
}