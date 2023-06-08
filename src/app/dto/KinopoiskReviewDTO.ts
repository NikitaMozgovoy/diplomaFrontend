export class KinopoiskReviewDTO {
  constructor(
    public movieId: number,
    public title: string,
    public review: string,
    public author: string
  ) {}
}
