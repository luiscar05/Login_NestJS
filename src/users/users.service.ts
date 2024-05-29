import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta de importación según la estructura de tu proyecto
import { User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';



@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly auth:AuthService

  ) {}

  async create(createUserDto: CreateUserDto):Promise<User> {
    const passwordCryto = await this.auth.crytoPassword(createUserDto.Contrasena)
    console.log(createUserDto.Rol);
    console.log( typeof(createUserDto.Cedula))
    const PrismaInput= {
      nombre: createUserDto.Nombre,
      cedula: createUserDto.Cedula,
      contrasena: passwordCryto,
      rol: createUserDto.Rol,
    };
    
    
    return this.prisma.user.create({
      data:PrismaInput
    });  
  }
  
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number):Promise<User> {
    return this.prisma.user.findUnique({
      where:{
        id:id
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

