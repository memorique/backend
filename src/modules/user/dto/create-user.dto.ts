import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


@Injectable()
export class CreateUserDTO{
    @IsNotEmpty()
    @IsString()
    firstName:String ;

    @IsNotEmpty()
    @IsString()
    lastName:String ;

    @IsNotEmpty()
    @IsEmail()
    email:String;

    @IsNotEmpty()
    @MinLength(8)
    password:String;

    @IsNotEmpty()
    city:string;

    @IsNotEmpty()
    state:string;

    @IsNotEmpty()
    country:string;
}