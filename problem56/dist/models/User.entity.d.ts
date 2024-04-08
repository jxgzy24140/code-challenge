import { Role } from "./Role.entity";
export declare class User {
    id: number;
    roleId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    scores: number;
    createdDate: Date;
    updatedDate?: Date;
    role: Role;
}
