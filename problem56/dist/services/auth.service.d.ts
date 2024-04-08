import { LoginInputDto } from "../dtos/auth/loginInputDto";
import { UserDto } from "../dtos/user";
declare class AuthService {
    private readonly userRepository;
    constructor();
    login(input: LoginInputDto): Promise<{
        accessToken: string;
        user: UserDto;
    } | null>;
    getCurrentLoginInfomation(id: number): Promise<UserDto | null>;
}
declare const _default: AuthService;
export default _default;
