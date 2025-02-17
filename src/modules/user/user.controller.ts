import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { LoginUserDTO } from "./dto/login-user.dto";
import { priceService } from "../price/price.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService, private readonly priceService: priceService) { }

    @Post("create")
    create(@Body() createUserDto: CreateUserDTO) {
        try {
            return this.userService.create(createUserDto);
        }
        catch (err) {
            console.log(err);
        }
    }

    @Post("login")
    login(@Body() loginUserDTO: LoginUserDTO) {
        try {
            return this.userService.login(loginUserDTO);
        }
        catch (err) {
            console.log(err);
        }

    }

    @Get("getLoggedInUser")
    async getLoggedInUser(@Req() req: any) {
        try {
            const { userId, organizationId } = req.user;
            const user = await this.userService.getUserById(userId);
            const prices = await this.priceService.getPriceList(organizationId);
            return { user: { firstName: user.firstName, lastName: user.lastName, email: user.email }, prices }
        }
        catch (err) {
            console.log(err);
        }

    }

}