import { Injectable } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service'; // Ajusta la ruta de importación según la estructura de tu proyecto
import { Grupo } from '@prisma/client';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class GruposService {
  constructor(
      private readonly prisma: PrismaService,
      private readonly auth:AuthService,
      private readonly prudto:ProductosService
  
    ) {}

     
    create(createGrupoDto: CreateGrupoDto) {
        return this.prisma.grupo.create({
          data:{
            nombre: createGrupoDto.nombre,
            descripcion: createGrupoDto.descripcion,
            id_usuario:createGrupoDto.id_usuario
          }
        })
    }
  findAll(  ) {
    return this.prisma.grupo.findMany();
  }


  findOne(id: number) {
    
    const stockGrupos = this.prudto.update_stock(id);

    console.log("stock desde grupos",stockGrupos);

    
  }

  update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return `This action updates a #${id} grupo`;
  }

  remove(id: number) {
    return `This action removes a #${id} grupo`;
  }
}
