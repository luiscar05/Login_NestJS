import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req ,Res} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request ,Response} from 'express';

@Controller('tokens')
@UseGuards(AuthGuard)  
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }
  

  @Get()
  findAll() {
    return this.tokensService.findAll();
  }
  
  @Get(':id') 
  async findOne(@Param('id') id: number) { 
     /*  const cookieValue = request.cookies['access_token'];
    console.log('Valor de la Cookie:', cookieValue);
     // Configurar una cookie de prueba para depurar */
     return  await this.tokensService.findOne(+id);  
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokensService.update(+id, updateTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokensService.remove(+id);
  }
}
