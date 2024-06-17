import { Injectable, HttpException, HttpStatus,Response } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
    async loginUse(cedula: number, contraseña: string, @Response() res) {
        console.log(`cedula: ${cedula}  contraseña: ${contraseña}`);
    
        const [User] = await this.Prisma.user.findMany({
            where: {
                cedula
            }
        });
    
        if (!User) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
          }
      
    
          const isPasswordValid = await bcrypt.compare(contraseña, User.contrasena);
          if (!isPasswordValid) {
            throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
          }

            const payLoad = { id: User.id, nombre: User.nombre, Identificacion: User.cedula, rol: User.rol };
            let token = this.jwtService.sign(payLoad);

            res.cookie('access_token', token, {
                httpOnly: true, // Hace que la cookie no sea accesible desde JavaScript en el navegador
                secure: process.env.NODE_ENV === 'production', // Solo envía la cookie a través de HTTPS en producción
                maxAge: 3600000 // 1 hora de expiración
              });
            
            /* const createTokenUser = {
                UserId: User.id,
                Token: token
            }

            await this.Prisma.token.create({
                data: createTokenUser
            }); */

            
            return res.send({ ...User, access_token: token });


            /* const createTokenUser = {
                UserId: User.id,
                Token: token
            };
            console.log(createTokenUser);
    
            await this.Prisma.token.create({
                data: createTokenUser
            });
    
            const tokenUser = await this.Prisma.token.findMany({
                where:{
                    UserId : User.id
                }
            });

                    const intervalId = setInterval(async () => {
                let DeleteTimeToken = await this.TimeLeft(User.id, token);
                console.log(DeleteTimeToken);
    
                if (DeleteTimeToken == "0:0:0") {
                    token = this.jwtService.sign(payLoad, { expiresIn: `${process.env.EXPIRES_FRESH}H` });
                    console.log(typeof token, "tipo de dato token");
                    console.log({ ...User, RefreshToken: token });
    
                    const BuscarUser = await this.Prisma.token.findMany({
                        where: {
                            UserId: User.id
                        }
                    });
    
                    if (BuscarUser.length > 0) {
                        await this.RefreshToken(User.id, token);
                        console.log("Token actualizado exitosamente");


                        
                        
                    }
                }
            }, 1000); */
    }
    
    async TimeLeft (id: number, token: string){
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
        
        
    } 
    async RefreshToken(id: number, RefreshTokenUser: string) {
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
    }
    
    
    
    
    
    
    
    
    
}
