import { Injectable, CanActivate, ExecutionContext, UnauthorizedException,Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromCookie(request); // Extrae el token de la cookie
        
        if (!token) {
            throw new UnauthorizedException('No se proporcionó token.');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.USER_SECRET, // Usa variable de entorno y valor por defecto
            });
            request['user'] = payload; // Asigna el payload al request

            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token expirado.');
              } else if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Token inválido.');
              } else if (error instanceof TypeError && error.message?.includes('access_token')) {
                // Error relacionado con la cookie (opcional)
                throw new UnauthorizedException('Cookie "access_token" no encontrada.');
              } else {
                throw new UnauthorizedException('Error al validar el token.');
              }
        }

        
    }

    private extractTokenFromCookie(@Req() request: Request): string | undefined {

        const CookieVaalue = request.cookies['access_token']
        console.log(CookieVaalue,"cookieGuard")
        return request.cookies?.access_token; // Obtiene el valor de la cookie 'access_token'
        
    }
}
