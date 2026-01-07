import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from './entity/user.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import type { AuthenticatedRequest } from '../../common/interfaces/authenticated-request.interface';
import { FilesService } from '../files/files.service';
import { MICROSERVICES } from '@libs/constants/microservices';
import { ProfileEntity } from '../../modules/users/entity/profile.entity';
import { UpdateProfileDto } from '@libs/dto/update-profile.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
@ApiTags('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    @Inject(MICROSERVICES.Users.name)
    private readonly userClient: ClientProxy,
    private readonly filesService: FilesService,
  ) {}

  @Get(':id/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ClassSerializerInterceptor) // Important for @Transform to work
  @ApiOkResponse({ description: 'Retrieved user profile' })
  async getProfile(@Param('id') id: string) {
    this.logger.log(`Fetching Profile of User: ${id}`);

    const profile = await firstValueFrom(
      this.userClient.send({ cmd: 'getProfile' }, { userId: id }),
    );

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    this.logger.log(`UserId: ${id} fetched profile of id: ${profile.id}`);
    return new ProfileEntity(profile);
  }

  @Patch(':id/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Profile updated successfully' })
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    this.logger.log(`Request received to update profile for User ID: ${id}`);

    this.logger.debug(
      `Payload for Profile update of User ${id}: ${JSON.stringify(updateProfileDto)}`,
    );
    const updatedProfile = await firstValueFrom(
      this.userClient.send(
        { cmd: 'updateProfile' },
        {
          userId: id,
          data: updateProfileDto,
        },
      ),
    );
    this.logger.debug(`Profile updated for user ${id}:`, updatedProfile);
    return plainToInstance(ProfileEntity, updatedProfile);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserEntity> {
    const uploadResult = await this.filesService.uploadAvatarFromFile(file);

    const updatedUser = await firstValueFrom(
      this.userClient.send(
        { cmd: 'uploadAvatar' },
        {
          id: req.user.id,
          avatarUrl: uploadResult.secure_url,
        },
      ),
    );

    return new UserEntity(updatedUser);
  }

  @Delete('avatar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserEntity,
    description: 'Avatar removed successfully',
  })
  async removeAvatar(@Req() req: AuthenticatedRequest): Promise<UserEntity> {
    // We delegate the logic to the gateway service
    const updatedUser = await firstValueFrom(
      this.userClient.send(
        { cmd: 'updateUser' },
        {
          id: req.user.id,
          data: { avatarUrl: null },
        },
      ),
    );
    return new UserEntity(updatedUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getAll() {
    const users = await firstValueFrom(
      this.userClient.send({ cmd: 'getAll' }, null),
    );
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id') id: string) {
    return new UserEntity(
      await firstValueFrom(this.userClient.send({ cmd: 'findUser' }, { id })),
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(
      await firstValueFrom(
        this.userClient.send(
          { cmd: 'updateUser' },
          { id, data: updateUserDto },
        ),
      ),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async removeUser(@Param('id') id: string) {
    return new UserEntity(
      await firstValueFrom(this.userClient.send({ cmd: 'removeUser' }, id)),
    );
  }
}
