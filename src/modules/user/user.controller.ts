import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { LoginUserDTO } from "./dto/login-user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("create")
    create(@Body() createUserDto: CreateUserDTO) {
        try{
            return this.userService.create(createUserDto);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    @Post("login")
    login(@Body() loginUserDTO: LoginUserDTO) {
        try{
            return this.userService.login(loginUserDTO);
        }
        catch(err)
        {
            console.log(err);
        }

    }

    @Get("getLoggedInUser")
    getLoggedInUser(@Req() req: any) {
        try{
            console.log(req.user);
        }
        catch(err)
        {
            console.log(err);
        }

    }

}