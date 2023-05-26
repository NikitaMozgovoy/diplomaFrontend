import { ReviewAuthorDTO } from "./ReviewAuthorDTO";

export class LocalReviewDTO {
    constructor(
        public id: number,
        public filmId: number,
        public author: ReviewAuthorDTO,
        public text:string
    ) {}
}
