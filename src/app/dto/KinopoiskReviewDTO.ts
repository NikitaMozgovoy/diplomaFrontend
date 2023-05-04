export class KinopoiskReviewDTO {
  constructor(
    public movieId: number,
    public title: string,
    public type: string,
    public review: string,
    public date: string,
    public author: string
  ) {}
}
