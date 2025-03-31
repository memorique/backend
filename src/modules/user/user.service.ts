import { CreateUserDTO } from "./dto/create-user.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async login(loginUserDTO:LoginUserDTO) {
    return this.userRepository.login(loginUserDTO);
  }

  async createUser(email: string, name: string, password: string) {
    return this.userRepository.createUser(email, name, password);
  }

  async getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  async updateUser(id: number, name: string, password: string, isActive: boolean) {
    return this.userRepository.updateUser(id, name, password, isActive);
  }

  async deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }

}