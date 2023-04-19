import { ReviewAuthorDTO } from "./reviewAuthorDTO";

export class ReviewDTO {
    constructor(
        public id: number,
        public author: ReviewAuthorDTO,
        public text:string
    ) {}
}