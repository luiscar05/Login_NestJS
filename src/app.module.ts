import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokensModule } from './tokens/tokens.module';
import { GruposModule } from './grupos/grupos.module';
import { ProductosModule } from './productos/productos.module';
import { VentasModule } from './ventas/ventas.module';
import { DetalleVentasModule } from './detalle-ventas/detalle-ventas.module';






@Module({
  imports: [UsersModule, PrismaModule, AuthModule,
    ConfigModule.forRoot({
      envFilePath:'.env',
      ignoreEnvFile:true,
      isGlobal:true
    }),
    AuthModule,
    AppModule,
    TokensModule,
    GruposModule,
    ProductosModule,
    VentasModule,
    DetalleVentasModule,
    
  ],
  controllers: [],
  providers: [UsersService, PrismaService, AuthService,JwtService],
})
export class AppModule {}
