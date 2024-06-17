import { Controller, Get, Post,Body,Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/auth/dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor (private  readonly authServe: AuthService){}
    
    @Post()
    login(@Body() UserDate:loginDto,@Res() res:Response){
        return this.authServe.loginUse(UserDate.Cedula,UserDate.Contrasena,res)
    }
}
