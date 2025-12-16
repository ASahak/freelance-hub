import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  IsArray,
} from 'class-validator';
import { Gender } from '@libs/types/profile.type';
import { AvailabilityStatus } from '@libs/types/profile.type';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'Senior Full Stack Developer',
    description: 'Professional headline',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  headline?: string;

  @ApiProperty({
    example: 'I have 5 years of experience in...',
    description: 'Detailed bio',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  bio?: string;

  @ApiProperty({
    example: 50.0,
    description: 'Hourly rate in USD',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : null)) // Ensure string "50" becomes number 50
  hourlyRate?: number;

  @ApiProperty({
    enum: AvailabilityStatus,
    example: AvailabilityStatus.available,
    description: 'Current availability for new work',
    required: false,
  })
  @IsEnum(AvailabilityStatus)
  @IsOptional()
  availabilityStatus?: AvailabilityStatus;

  @ApiProperty({ example: 'USA', required: false })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ example: 'New York', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ enum: Gender, required: false })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender | null;

  @ApiProperty({ example: 'America/New_York', required: false })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiProperty({ example: 'https://github.com/johndoe', required: false })
  @IsUrl()
  @IsOptional()
  githubUrl?: string;

  @ApiProperty({ example: 'https://linkedin.com/in/johndoe', required: false })
  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;

  @ApiProperty({ example: 'https://johndoe.com', required: false })
  @IsUrl()
  @IsOptional()
  portfolioUrl?: string;

  @ApiProperty({ example: 'https://docs.google.com/resume', required: false })
  @IsUrl()
  @IsOptional()
  resumeUrl?: string;

  @ApiProperty({
    example: ['React', 'NestJS', 'Docker'],
    description: 'List of skills to tag on the profile',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];
}
