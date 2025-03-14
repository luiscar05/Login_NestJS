import { Test, TestingModule } from '@nestjs/testing';
import { DetalleVentasController } from './detalle-ventas.controller';
import { DetalleVentasService } from './detalle-ventas.service';

describe('DetalleVentasController', () => {
  let controller: DetalleVentasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleVentasController],
      providers: [DetalleVentasService],
    }).compile();

    controller = module.get<DetalleVentasController>(DetalleVentasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
