import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule} from '@nestjs/jwt';




@Module({
  controllers: [AuthController],
  providers:[PrismaService,AuthService],
  exports:[AuthService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.USER_SECRET,
      signOptions: {expiresIn:`${process.env.EXPIRES_IN}h`} 
    })
   
  ],
  
})
export class AuthModule {}
