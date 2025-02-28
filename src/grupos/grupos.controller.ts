import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/rols.guard';
import { Roles } from 'src/auth/decorations/rol.decoration';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post()
  @UseGuards(AuthGuard,RolesGuard)
  @Roles('admin') 
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  } 

  @Get()
  findAll() {
    return this.gruposService.findAll();
  }

  /* 
  prueba de stock conectar servicios 
  @Patch('stock/:id')
  findOne(@Param('id') id: string) {
    return this.gruposService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.gruposService.update(+id, updateGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gruposService.remove(+id);
  }
}
