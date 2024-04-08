import { LoginInputDto } from "../dtos/auth/loginInputDto";
import { UserDto } from "../dtos/user";
import mapper from "../helpers/autoMapper";
import { AppDataSource } from "../helpers/data-source";
import { User } from "../models/User.entity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  private readonly userRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async login(input: LoginInputDto) {
    const user = await this.userRepository.findOne({
      where: { email: input.email },
      relations: ["role"],
    });
    if (!user) return null;
    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) return null;
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const tokenSecretKey = process.env.TOKEN_SECRET_KEY ?? "";
    const accessToken = jwt.sign(payload, tokenSecretKey, {
      expiresIn: "1h",
    });
    return {
      accessToken: accessToken,
      user: mapper.map(user, User, UserDto),
    };
  }

  async getCurrentLoginInfomation(id: number): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["role"],
    });
    return user ? mapper.map(user, User, UserDto) : null;
  }
}

export default new AuthService();
