import { Controller, Get, Post,Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from 'src/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor (private  readonly authServe: AuthService){}
    
    @Post()
    login(@Body() UserDate:loginDto){
        return this.authServe.loginUse(UserDate.Cedula,UserDate.Contrasena)
    }
}
