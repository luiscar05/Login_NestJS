import { IsInt,  IsString, isNumber } from "class-validator"
export class CreateGrupoDto {
    @IsString()
    nombre: string

    @IsString()
    descripcion: string

    @IsInt()
    id_usuario: number
}
