import { Controller, Get, Post,Body,Res,Req,UseGuards, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/auth/dto/login.dto';
import { request, Request, Response } from 'express';
import { get } from 'http';
import { AuthGuard } from './guards/auth.guard';

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

    @Get(':Id')
    @UseGuards(AuthGuard)
    async logout  (@Req() req: Request,@Res() res:Response,@Param('Id') Id:number){
        req.cookies['access_token'] ;
        res.clearCookie('access_token');
        res.clearCookie('access_token_Refrech');
        res.send('Cookie eliminada')
       return this.authServe.logout(+Id)
    }

}
