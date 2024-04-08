import bcrypt from "bcryptjs";
import mapper from "../helpers/autoMapper";
import { AppDataSource } from "../helpers/data-source";
import {
  CreateUserInputDto,
  UpdateUserInputDto,
  UpdateUserScoresInputDto,
  UserDto,
  UserRakingDto,
} from "../dtos/user";
import { User } from "../models/User.entity";
import socketIoService from "./socketio.service";
class UserService {
  private readonly userRepository;
  private readonly io;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.io = socketIoService.getIO();
  }

  async createUser(input: CreateUserInputDto): Promise<User | null> {
    try {
      const existedUser = await this.userRepository.findOne({
        where: { email: input.email },
      });
      if (existedUser) return null;
      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(input.password, salt);
      const newUser = this.userRepository.create(input);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateUser(
    id: number,
    input: UpdateUserInputDto
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) return null;
      Object.keys(input).forEach((key: any) => {
        // @ts-ignore
        const value = input[key];
        if (value && key !== "password") {
          // @ts-ignore
          user[key] = value;
        }
      });
      await this.userRepository.save(user);
      return await this.userRepository.findOne({
        where: { id },
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async delete(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) return null;
      await this.userRepository.delete(id);
      return user;
    } catch {
      return null;
    }
  }

  async get(id: number): Promise<UserDto | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ["role"],
      });
      if (!user) return null;
      return mapper.map(user, User, UserDto);
    } catch {
      return null;
    }
  }

  async getAll(
    pageNumber: number,
    pageSize: number
  ): Promise<UserDto[] | any[]> {
    try {
      const users = await this.userRepository.find({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        relations: ["role"],
      });
      console.log(users);
      return users.length ? mapper.mapArray(users, User, UserDto) : [];
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getTenUsersHighestScores(): Promise<UserRakingDto[] | []> {
    try {
      const users = await this.userRepository.find({
        order: {
          scores: "DESC",
        },
        take: 10,
      });
      return mapper.mapArray(users, User, UserRakingDto);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async updateUserScore(
    id: number,
    input: UpdateUserScoresInputDto
  ): Promise<UserDto | null> {
    try {
      const user = await this.get(id);
      if (!user) return null;
      const newScores = Number(user.scores) + Number(input.scores);
      user.scores = newScores;
      await this.userRepository.save(user);
      const isUpdated = await this.checkRankingIsUpdated(id);
      if (isUpdated) {
        socketIoService.sendMessage("update-ranking", isUpdated);
      }
      return this.get(id);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  private async checkRankingIsUpdated(
    userId: number
  ): Promise<boolean | UserRakingDto[]> {
    const currentRanking = await this.getTenUsersHighestScores();
    const userExistsInRanking = currentRanking.some((x) => x.id == userId);
    return userExistsInRanking ? currentRanking : false;
  }
}

export default new UserService();
