import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(60, { message: 'Headline is too long (max 60 chars)' })
  headline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;
}