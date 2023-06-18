export class TmdbReviewDTO {
  constructor(
    public filmId: number,
    public id: string,
    public text: string,
    public rating: number,
    public author: string
  ) {}
}
