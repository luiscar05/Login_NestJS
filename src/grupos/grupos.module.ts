import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ProductosService } from 'src/productos/productos.service';
import { ProductosController } from 'src/productos/productos.controller';

@Module({
  controllers: [GruposController,ProductosController],
  providers: [GruposService,JwtService,ProductosService],
  imports: [PrismaModule,AuthModule]
})
export class GruposModule {}
