import { Injectable } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class DetalleVentasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth:AuthService,
  ){}


  create(createDetalleVentaDto: CreateDetalleVentaDto) {
    return this.prisma.detalle_Venta.create({
      data:{
        id_venta: createDetalleVentaDto.id_venta,
        id_producto: createDetalleVentaDto.id_producto,
        cantidad: createDetalleVentaDto.cantidad,
        subtotal: createDetalleVentaDto.subtotal,
      }
    })
  }

  findAll() {
    return `This action returns all detalleVentas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleVenta`;
  }

  update(id: number, updateDetalleVentaDto: UpdateDetalleVentaDto) {
    return `This action updates a #${id} detalleVenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleVenta`;
  }
}
