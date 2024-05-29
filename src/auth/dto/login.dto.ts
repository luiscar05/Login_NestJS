import { IsInt,  IsString, isNumber } from "class-validator"

export class loginDto {
    @IsInt()
    Cedula: number

    @IsString()
    Contrasena: string

}
