import { Injectable, NotFoundException } from '@nestjs/common';
import { IService } from 'src/common/service.interface';
import { EnvironmentRepository } from './environment.repository';
import { EnvironmentDTO } from './model/environment.dto';
import { IEnvironment } from './model/environment.interface';

@Injectable()
export class EnvironmentService
  implements IService<EnvironmentDTO, IEnvironment> {
  constructor(private readonly repository: EnvironmentRepository) {}
  async create(dto: EnvironmentDTO): Promise<IEnvironment> {
    return this.repository.create(dto);
  }
  async getAll(): Promise<IEnvironment[]> {
    return this.repository.getAll();
  }
  async getLast(): Promise<IEnvironment> {
    const environments: IEnvironment[] = await this.repository.getAll();
    if (!environments.length) {
      return Promise.reject(
        new NotFoundException('Environment data not found'),
      );
    }
    const last_environment: IEnvironment = environments.sort(function(a, b) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })[0];
    return last_environment;
  }
  async getById(id: string): Promise<IEnvironment> {
    return this.repository.getById(id);
  }
  async update(id: string, dto: EnvironmentDTO): Promise<IEnvironment> {
    return this.repository.update(id, dto);
  }
  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
