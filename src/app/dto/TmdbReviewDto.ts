export class TmdbReviewDTO {
  constructor(
    public filmId: number,
    public text: string,
    public rating: number,
    public author: string
  ) {}
}
