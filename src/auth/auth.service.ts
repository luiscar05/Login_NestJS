import { Injectable, HttpException, HttpStatus,Response, Request, Req, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken'

@Injectable()
export class AuthService {

    constructor(
        private readonly Prisma:PrismaService,
        private readonly jwtService:JwtService 
    ){}

    async crytoPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        
        console.log(hash);
        
        return hash;
    }
    async login(cedula: number, contraseña: string, @Response() res,@Request() req) {
        try {
          console.log(`cedula: ${cedula}  contraseña: ${contraseña}`);
          // Validate input
          if (!cedula || !contraseña) {
            throw new HttpException('Cédula y contraseña son requeridos', HttpStatus.BAD_REQUEST);
          }
    
          // Buscar Usuario
          const [User] = await this.Prisma.user.findMany({
            where: {
              cedula
            }
          });
    
          if (!User) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
          }
    
          // Validacion de contraseña
          const isPasswordValid = await bcrypt.compare(contraseña, User.contrasena);
          if (!isPasswordValid) {
            throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
          }
    
          // Creacion JWT payload
          const payLoad = { id: User.id, nombre: User.nombre, Identificacion: User.cedula, rol: User.rol };
          let token = this.jwtService.sign(payLoad, { expiresIn: '1h' });
          const RefreshToken = this.jwtService.sign(payLoad,{ expiresIn: '24h' })

          /* const Decoded = JWT.verify(token,process.env.USER_SECRET)
          console.log(Decoded,"datos token") */

           /* const newUserToken = await this.Prisma.token.create({
            data: {
              UserId: Number(User.id), // Convertir 'id' a 'number'
              token:token ,
              RefrechToken: RefreshToken,
            } 
        }) */
    
          // Set secure cookie
          res.cookie('access_token', token, {
            httpOnly: true, // Prevents access via JavaScript
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            maxAge: 3600000, // 1 hour
            sameSite: 'strict' // Helps prevent CSRF
          });
          res.cookie('access_token_Refrech', RefreshToken, {
            httpOnly: true, // Prevents access via JavaScript
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            maxAge: 86400000, // 24 hour
            sameSite: 'strict' // Helps prevent CSRF
          });

          return res.send({ ...User, access_token: token , access_token_Refrech: RefreshToken});
        } catch (error) {
          console.error('Error en el login:', error);
          throw new HttpException('Error en el servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
   /*  async TimeLeft (id: number, token: string){
        const userToken = await this.Prisma.token.findMany({
            where:{
                UserId:id
            }
        })
        if (userToken) {
            const timeDelet= this.jwtService.decode(token)
            const deleteToken= new Date(timeDelet.exp * 1000)
            const DateNow = new Date()

            const time= DateNow.getTime() - deleteToken.getTime()
            let hours = Math.floor(time/ (1000 * 60 * 60))
            let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);

            return `${hours}:${minutes}:${seconds}`    
        }else{
            return new HttpException("Lo siento Puedes Inciar Sesión",401)
        }
        
        
    }  */
    async UserLogin(Token:string){
      
      if (Token) {
        const InfoUserLogin= this.jwtService.decode(Token)
        return InfoUserLogin
      } else {
        console.log("token Invalido")
      }
      
    }
    /* async RefreshToken(id: number, RefreshTokenUser: string) {
        try {

            console.log("Inicia Actualizacion")
            // Actualizar el token en la base de datos
            const newToken = await this.Prisma.token.update({
                where: {
                    UserId: id
                },
                data: {
                    Token: RefreshTokenUser
                }
            });
    
            // Imprimir el resultado de la actualización y un mensaje de éxito
            
            // Devolver el nuevo token actualizado (opcional)
            return await this.Prisma.token.findMany() + "nuevo token";
        } catch (error) {
            // Manejar y mostrar cualquier error que ocurra
            console.error("Error al actualizar el token:", error);
        }
    } */    
}
