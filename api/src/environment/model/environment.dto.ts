import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class EnvironmentDTO {
  @IsOptional()
  id: string;

  @IsOptional()
  created_at: string;

  @IsNumber()
  @Min(0)
  @Max(50)
  temperature: number;

  @IsNumber()
  @Min(20)
  @Max(90)
  humidity: number;
}
