import { User } from "./User.entity";
export declare class Role {
    id: number;
    roleName: string;
    users?: User[];
}
