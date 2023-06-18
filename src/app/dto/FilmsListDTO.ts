export class FilmsListDTO {
  constructor(
    public id: number,
    public name: string,
    public alternativeName: string,
    public year: number,
    public kinopoiskRating: number,
    public imdbRating: number,
    public posterUrl: string,
    public genresList: Array<string>,
    public countriesList: Array<string>,
    public type: string,
    public shortDescription: string
  ) {}
}
