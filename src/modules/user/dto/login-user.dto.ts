import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@Injectable()
export class LoginUserDTO{
    @IsNotEmpty()
    @IsEmail()
    email:String;

    @IsNotEmpty()
    @MinLength(8)
    password:String;
  
}
