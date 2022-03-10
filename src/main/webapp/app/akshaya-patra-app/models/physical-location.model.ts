export class PhysicalLocationModel {
  constructor(
    public address: string,
    public state: string,
    public city: string,
    public locality: string,
    public region: string,
    public country: string
  ) {}

}
