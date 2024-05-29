import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles, "este debe ser un rol")
    
    if (!requiredRoles) {
      return true; // No se especificaron roles, permitir acceso
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.USER_SECRET,
      });
      request.user=payload
      console.log(request.user.rol, "este rol usuer")
      if(request.user.rol === requiredRoles){
        return true;
      }
      // Verificar si el usuario tiene al menos uno de los roles requeridos
      const userRoles: string[] = payload.roles;
      const hasRequiredRole = userRoles.some(role => requiredRoles.includes(role));
      
      if (!hasRequiredRole) {
        throw new UnauthorizedException('Insufficient permissions');
      }

      
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

}
