import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(12)
    password: string;
}