import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { EnvironmentDTO } from './model/environment.dto';
import { IEnvironment } from './model/environment.interface';
import { EnvironmentService } from './environment.service';

@Controller('environments')
export class EnvironmentController {
  constructor(private readonly service: EnvironmentService) {}
  @Post()
  async saveEnvironment(
    @Body() environment: EnvironmentDTO,
  ): Promise<IEnvironment> {
    return await this.service.create(environment);
  }

  @Get('')
  async getEnvironments(): Promise<IEnvironment[]> {
    return await this.service.getAll();
  }

  @Get('/last')
  async getLastEnvironment(): Promise<IEnvironment> {
    return await this.service.getLast();
  }

  @Get('/:id')
  async getEnvironmentById(@Param('id') id: string): Promise<IEnvironment> {
    return await this.service.getById(id);
  }

  @Put('/:id')
  async updateEnvironment(
    @Param('id') id: string,
    @Body() environment: EnvironmentDTO,
  ) {
    return await this.service.update(id, environment);
  }

  @Delete('/:id')
  async deleteEnvironment(@Param('id') id: string, @Res() res): Promise<void> {
    await this.service.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
