import { Model } from "mongoose";
import { CreateUserDTO } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { ConfigurationService } from "../configuration/configuration.service";
import { priceService } from "../price/price.service";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly authService: AuthService, private readonly configurationService: ConfigurationService, private readonly priceService: priceService) {
  }

  async create(createUserDto: CreateUserDTO): Promise<any> {
    const newUser = new this.userModel(createUserDto);
    const user = await newUser.save();
    const defaultPrices = await this.configurationService.getDefaultPriceList();
    const prices = await this.priceService.addDefaultPrices(user.organizationId, defaultPrices);
    const token = this.authService.generateToken(user);
    return { user: { firstName: user.firstName, lastName: user.lastName, email: user.email }, prices, token };
  }

  async login(loginUserDto: LoginUserDTO): Promise<any> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = user.password === loginUserDto.password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');  
    }

    const token = this.authService.generateToken(user);
    const prices = this.priceService.getPriceList(user.organizationId);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      prices,
      token
    };
  }

  async getUserById(userId: string): Promise<any> {
    const user = await this.userModel.findOne({ userId: userId, isActivated:true, isDeleted:false, isBlocked:false });
    return user;

  }
}