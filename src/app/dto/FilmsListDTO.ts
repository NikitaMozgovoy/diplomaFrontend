export class FilmsListDTO {
  constructor(
    public id: number,
    public name: string,
    public year: number,
    public countries: any,
    public posterUrl: string,
    public genres: any,
    public type: string,
    public description: string
  ) {}
}
