import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityStatus, Profile } from '@libs/types/profile.type';
import { Exclude, Transform, Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

export class SkillEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class ProjectEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  imageUrl: string;

  @ApiProperty({ required: false })
  demoUrl: string;

  @ApiProperty({ required: false })
  repoUrl: string;

  @ApiProperty({ type: [String] })
  technologies: string[];

  @Exclude()
  profileId: string;

  @ApiProperty()
  createdAt: string; // Ensure this matches string vs Date logic
}

export class ExperienceEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  role: string;

  @ApiProperty({ required: false })
  location: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty({ required: false })
  endDate: string;

  @ApiProperty({ required: false })
  description: string;
}

export class ProfileEntity implements Profile {
  constructor(partial: Partial<ProfileEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ example: 'Senior Full Stack Developer', required: false })
  @IsString()
  @IsOptional()
  headline: string | null;

  @ApiProperty({ example: 'I specialize in NestJS and React...', required: false })
  @IsString()
  @IsOptional()
  bio: string | null;

  @ApiProperty({ example: 50.0, required: false, type: Number })
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : null))
  hourlyRate: number | null;

  @ApiProperty({ example: 'USD', default: 'USD' })
  currency: string;

  @ApiProperty({
    enum: AvailabilityStatus,
    example: AvailabilityStatus.available,
    description: 'Current work availability status'
  })
  @IsEnum(AvailabilityStatus)
  availabilityStatus: AvailabilityStatus;

  @ApiProperty({ example: 'USA', required: false })
  country: string | null;

  @ApiProperty({ example: 'New York', required: false })
  city: string | null;

  @ApiProperty({ example: 'America/New_York', required: false })
  timezone: string | null;

  @ApiProperty({ example: 'https://github.com/username', required: false })
  @IsUrl()
  @IsOptional()
  githubUrl: string | null;

  @ApiProperty({ example: 'https://linkedin.com/in/username', required: false })
  @IsUrl()
  @IsOptional()
  linkedinUrl: string | null;

  @ApiProperty({ example: 'https://myportfolio.com', required: false })
  @IsUrl()
  @IsOptional()
  portfolioUrl: string | null;

  @ApiProperty({ example: 'https://resume.com/view', required: false })
  @IsUrl()
  @IsOptional()
  resumeUrl: string | null;

  @ApiProperty({ type: [SkillEntity] })
  @ValidateNested({ each: true })
  @Type(() => SkillEntity)
  skills: SkillEntity[];

  @ApiProperty({ type: [ProjectEntity] })
  @ValidateNested({ each: true })
  @Type(() => ProjectEntity)
  projects: ProjectEntity[];

  @ApiProperty({ type: [ExperienceEntity] })
  @ValidateNested({ each: true })
  @Type(() => ExperienceEntity)
  experiences: ExperienceEntity[];

  @Transform(({ value }) => value?.toISOString())
  createdAt: string;
}
