import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { EnvironmentRepository } from './environment.repository';

@Module({
  providers: [EnvironmentService, EnvironmentRepository],
  controllers: [EnvironmentController],
})
export class EnvironmentModule {}
