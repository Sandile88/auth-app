import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDTO {
    @IsString()
    token: string;

    @IsString()
    @MinLength(12)
    newPassword: string;
}