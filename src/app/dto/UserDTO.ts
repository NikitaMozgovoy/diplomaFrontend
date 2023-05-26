import {LocalReviewDTO} from "./LocalReviewDTO";

export class UserDTO {
    constructor(
        public id: number,
        public username: string,
        public email: string,
        public reviews: Array<LocalReviewDTO>
      ) {}
}
