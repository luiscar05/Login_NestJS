import { Controller, Get, Post,Body,Res,Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/auth/dto/login.dto';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor (private  readonly authServe: AuthService){}
    
    @Post()
    login(@Body() UserDate:loginDto,@Res() res:Response,@Req() req:Request){
        return this.authServe.login(UserDate.Cedula,UserDate.Contrasena,res,req)
    }

    @Get('verify')
    verify(@Req() req: Request) {
    const cookie = req.cookies.access_token
    return this.authServe.UserLogin(cookie)// Verifica la cookie y devuelve respuesta
    }


}
