import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service'; // Ajusta la ruta de importación según la estructura de tu proyecto

@Injectable()
export class VentasService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly auth:AuthService,
  ){}


  create(createVentaDto: CreateVentaDto) {
    return this.prisma.ventas.create({
      data:{
        id_grupo: createVentaDto.id_grupo,
        fecha_venta: createVentaDto.fecha_venta,
        total: createVentaDto.total,
        estado: createVentaDto.estado,
      }
    })
  }

  findAll() {
    return `This action returns all ventas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }
}
