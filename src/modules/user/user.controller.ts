import { Body, Controller, Get, Post, Req, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { AuthService } from "../auth/auth.service";
import { User } from "./user.entity";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService, private authService: AuthService) { }

    @Post("create")
    create(@Body() createUserDto: CreateUserDTO) {
        try {
            //   return this.userService.create(createUserDto);
        }
        catch (err) {
            console.log(err);
        }
    }

    @Post("login")
    async login(@Body() loginUserDTO: LoginUserDTO) {
        try {
            const result = await this.userService.login(loginUserDTO);
            const user = result[0][0];
            if (user?.error) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const token = this.authService.generateToken(user);

            return {
                user: {
                    name: user.name,
                    email: user.email
                },
                token
            };
        }
        catch (err) {
            console.log(err);
        }

    }

    @Get("getLoggedInUser")
    async getLoggedInUser(@Req() req: any) {
        try {
            // this.userService.login({email:"test@gmail.com",password:"w2323"});
            // const { userId, organizationId } = req.user;
            //  const user = await this.userService.getUserById(userId);
            //return { user: { firstName: user.firstName, lastName: user.lastName, email: user.email }, prices }
        }
        catch (err) {
            console.log(err);
        }

    }

}