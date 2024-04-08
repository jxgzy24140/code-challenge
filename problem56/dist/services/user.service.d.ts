import { CreateUserInputDto, UpdateUserInputDto, UpdateUserScoresInputDto, UserDto, UserRakingDto } from "../dtos/user";
import { User } from "../models/User.entity";
declare class UserService {
    private readonly userRepository;
    private readonly io;
    constructor();
    createUser(input: CreateUserInputDto): Promise<User | null>;
    updateUser(id: number, input: UpdateUserInputDto): Promise<User | null>;
    delete(id: number): Promise<User | null>;
    get(id: number): Promise<UserDto | null>;
    getAll(pageNumber: number, pageSize: number): Promise<UserDto[] | any[]>;
    getTenUsersHighestScores(): Promise<UserRakingDto[] | []>;
    updateUserScore(id: number, input: UpdateUserScoresInputDto): Promise<UserDto | null>;
    private checkRankingIsUpdated;
}
declare const _default: UserService;
export default _default;
