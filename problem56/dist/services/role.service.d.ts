import { Role } from "../models/Role.entity";
declare class RoleService {
    private roleRepository;
    createRole(input: Role): Promise<Role | null>;
    updateRole(id: number, input: Role): Promise<Role | null>;
    delete(id: number): Promise<Role | null>;
    get(id: number): Promise<Role | null>;
    getAll(pageNumber: number, pageSize: number): Promise<Role[] | []>;
}
declare const _default: RoleService;
export default _default;
