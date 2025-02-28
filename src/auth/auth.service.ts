import { Injectable, HttpException, HttpStatus,Response, Request,Req,Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken'
import { Console } from 'console';
import { User } from '@prisma/client';
import path from 'path';
import { Token } from 'src/tokens/entities/token.entity';
import { request } from 'express';

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

          
            this.SesionCreate(User.id) 
          // Set secure cookie
          res.cookie('access_token', token, {
            httpOnly: true, // Prevents access via JavaScript
            secure: false,
            /* secure: process.env.NODE_ENV === 'production', // HTTPS only in production */
            maxAge: 86400000, // 24 hour
            sameSite: 'lax' , // Helps prevent CSRF  strict en produccion*/
            path : '/'
          });

          res.cookie('access_token_Refrech', RefreshToken, {
            httpOnly: true, // Prevents access via JavaScript
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            maxAge: 86400000, // 24 hour
           sameSite: process.env.NODE_ENV === 'production'? 'strict' : 'lax', // Helps prevent CSRF */
           path: '/'
          });

          
          return res.send({ ...User, access_token: token , access_token_Refrech: RefreshToken});
        } catch (error) {
          console.error('Error en el login:', error);
          throw new HttpException('Error en el servidor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async  SesionCreate(userId:number ){
      try {
        return await this.Prisma.token.create({
          data:{
            UserId:userId
          }
        }) 
        
      } catch (error) {
        console.log(error,"error al guardar sesion")
        
      }
    } 

    async UserLogin(Token:string){
      
      if (Token) {
        const InfoUserLogin= this.jwtService.decode(Token)
        return InfoUserLogin
      } else {
        console.log("token Invalido")
      }
      
    } 

    async logout (userId:number){

      // eliminar usuario de la sesion
      try {
       const IdToken= await this.Prisma.token.findFirst({
          where:{
            UserId:userId
          },
          select: { // Selecciona solo lo que necesitas (mejora el rendimiento)
            id: true // O cualquier otro campo mínimo
          }
        })
        console.log(IdToken.id,"token fin sesion")
        if (IdToken.id) {
          await this.Prisma.token.deleteMany({
            where:{
              id:IdToken.id
            }
          }) 
          
            
        }else{
          return{message : "No Hay Sesion Iniciada"}
        } 

      } catch (error) {
        console.log(error,"error al eliminar sesion")
      }
    }
  }
