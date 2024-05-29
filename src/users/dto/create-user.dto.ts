import { IsInt,  IsString, isNumber } from "class-validator"

export class CreateUserDto {
    @IsString()
    Nombre: string

    @IsInt()
    Cedula: number

    @IsString()
    Contrasena: string

    @IsString()
    Rol: string
}
