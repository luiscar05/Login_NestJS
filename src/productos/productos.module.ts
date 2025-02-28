import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService,JwtService],
  imports: [PrismaModule,AuthModule]
})
export class ProductosModule {}
