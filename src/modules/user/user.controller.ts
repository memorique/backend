import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("create")
    create(@Body() createUserDto: CreateUserDTO) {
        try{
            console.log("test");
            return this.userService.create(createUserDto);
        }
        catch(err)
        {
            console.log(err);
        }

    }

}