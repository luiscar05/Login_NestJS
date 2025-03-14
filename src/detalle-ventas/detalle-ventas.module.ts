import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService,JwtService],
  imports: [PrismaModule,AuthModule]
})
export class DetalleVentasModule {}
