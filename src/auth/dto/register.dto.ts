import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDTO {
    @IsString()
    name: string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(12)
    password: string;
}