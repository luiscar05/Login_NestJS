import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Token,User } from '@prisma/client';

@Injectable()
export class TokensService {

  constructor(
    private readonly prisma: PrismaService,
  ){}

  create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
  }

  findAll() {
    return `This action returns all tokens`;
  }

  
  async findOne(id: number):Promise<Token>{
    
      try {
        const sesion = await this.prisma.token.findFirst({
          where: {
              UserId: id,
          },
          include: {
            user:{
              select:{
                nombre:true,
                rol:true
              }
            }
          },
        });
       if (!sesion) {
          console.log("Sesión no encontrada.")
          return null
        }
          console.log("Usuario Encontrado y Sesion Activa ",typeof(sesion))
          return sesion
      } catch (error) {
        console.error("Error al obtener el token:", error);
          return null
      }
     
}

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
