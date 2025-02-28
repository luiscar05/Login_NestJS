import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service'; // Ajusta la ruta de importación según la estructura de tu proyecto
import { Productos } from '@prisma/client';

@Injectable()
export class ProductosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth:AuthService
  ){}

  create(createProductoDto: CreateProductoDto) {
    return this.prisma.productos.create({
      data:{
        nombre: createProductoDto.nombre,
        descripcion: createProductoDto.descripcion,
        precio: createProductoDto.precio,
        stock: createProductoDto.stock,
      }
    })
  }

  findAll() {
    return this.prisma.productos.findMany();
  }

  findOne(id: number) {
    return this.prisma.productos.findUnique({
      where:{
        id_Producto:id
      }
    })
  };

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.prisma.productos.update({
      data:{
        nombre: updateProductoDto.nombre,
        descripcion: updateProductoDto.descripcion,
        precio: updateProductoDto.precio,
      },
      where:{
        id_Producto:id
      }
    });
  }
  async update_stock(id: number) {
    try{
      const StockProducto = await this.prisma.productos.findUnique({
        where:{
          id_Producto:id
        },
        select:{
          stock:true
        }
      });
      
      console.log(StockProducto.stock,"StockProducto");
    }catch(e){
      console.log(e);
    }
    
    /* return this.prisma.productos.update({
      data:{
        stock:StockProducto,
      },
      where:{
        id_Producto:id
      }
    }); */
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
