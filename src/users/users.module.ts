import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';



@Module({
  controllers: [UsersController],
  providers: [UsersService,JwtService],
  imports:[PrismaModule,AuthModule]
})
export class UsersModule {}
