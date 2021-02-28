import { IRepository } from 'src/common/repository.interface';
import { EnvironmentDTO } from './model/environment.dto';
import { IEnvironment } from './model/environment.interface';
import * as crypto from 'crypto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EnvironmentRepository
  implements IRepository<EnvironmentDTO, IEnvironment> {
  private in_memory_db: EnvironmentDTO[] = [];
  create(dto: EnvironmentDTO): Promise<IEnvironment> {
    dto.id = crypto.randomBytes(12).toString('hex');
    dto.created_at = new Date().toISOString();
    this.in_memory_db.push(dto);
    return Promise.resolve({ ...dto });
  }
  getAll(): Promise<IEnvironment[]> {
    return Promise.resolve(this.in_memory_db.map(item => ({ ...item })));
  }
  getById(id: string): Promise<IEnvironment> {
    const item: EnvironmentDTO = this.in_memory_db.find(item => item.id === id);
    if (!item) {
      return Promise.reject(
        new NotFoundException('Environment data not found.'),
      );
    }
    return Promise.resolve(item);
  }
  update(id: string, dto: EnvironmentDTO): Promise<IEnvironment> {
    const item: EnvironmentDTO = this.in_memory_db.find(item => item.id === id);
    if (!item) {
      return Promise.reject(
        new NotFoundException('Environment data not found.'),
      );
    }
    const itemNew: EnvironmentDTO = { id, ...dto };
    this.in_memory_db = this.in_memory_db.map(item => {
      if (item.id === id) {
        item = itemNew;
      }
      return item;
    });
    return Promise.resolve({ ...itemNew });
  }
  delete(id: string): Promise<boolean> {
    this.in_memory_db = this.in_memory_db.filter(item => item.id !== id);
    return Promise.resolve(true);
  }
}
