import { Model } from "mongoose";
import { CreateUserDTO } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>) {
    }

    async create(createUserDto: CreateUserDTO) : Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
      }
}