import { CanActivate, ExecutionContext, Injectable , UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // El objeto context proporciona información
    // sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request)
    

    if (!token) {
      throw new UnauthorizedException();
    }

    try{
      const payload = await this.jwtService.verifyAsync(token,{
        secret: process.env.USER_SECRET
      })
      request.user = payload

    }catch (error){
      throw new UnauthorizedException();
    }
    

    // Aquí puedes implementar tu lógica de autenticación o autorización.
    // Por ejemplo, verificar si el usuario está autenticado, si tiene los roles adecuados, etc.

    // Si la validación es exitosa, devuelve true, permitiendo el acceso.
    // Si la validación falla, devuelve false, denegando el acceso.

    return true; // o false, dependiendo de la lógica de tu guard.
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    /* console.log(token, "este es el token ") */
    return type
    /* return type === "Bearer" ? token : undefined; */
  }
}
