import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../auth/dto/register-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
