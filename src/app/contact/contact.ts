export class Contact {
  constructor(
    public name?: string,
    public phone?: string,
    public email?: string,
    public csrf?: string,
    public id?: string
  ) {}
}