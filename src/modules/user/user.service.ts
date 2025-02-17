import { Model } from "mongoose";
import { CreateUserDTO } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly authService: AuthService) {
  }

  async create(createUserDto: CreateUserDTO): Promise<any> {
    const newUser = new this.userModel(createUserDto);
    const user = await newUser.save();
    const token = this.authService.generateToken(user);
    return { user: { firstName: user.firstName, lastName: user.lastName, email: user.email }, token };
  }

  async login(loginUserDto: LoginUserDTO): Promise<any> {
    console.log("loginUserDtologinUserDto",loginUserDto);
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    console.log("useruser",user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = user.password===loginUserDto.password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');  // Handle incorrect password
    }

    const token = this.authService.generateToken(user);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    };
  }

  async getUserById(): Promise < any > {
  // const newUser = new this.userModel(createUserDto);
  // const user = await newUser.save();
  // const token = this.authService.generateToken(user);
  // return token;
}
}