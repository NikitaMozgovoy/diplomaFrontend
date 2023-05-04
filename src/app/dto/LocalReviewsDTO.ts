import { ReviewAuthorDTO } from "./ReviewAuthorDTO";

export class LocalReviewsDTO {
    constructor(
        public id: number,
        public author: ReviewAuthorDTO,
        public text:string
    ) {}
}
