import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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
import { ProfileEntity } from '@apps/api-gateway/src/modules/users/entity/profile.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    @Inject(MICROSERVICES.Users.name)
    private readonly userServiceClient: ClientProxy,
    private readonly filesService: FilesService,
  ) {}

  @Get(':id/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Retrieved user profile' })
  async getProfile(@Param('id') id: string) {
    const profile = await firstValueFrom(
      this.userServiceClient.send({ cmd: 'getProfile' }, { userId: id }),
    );
    return new ProfileEntity(profile);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Profile updated successfully' })
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() updateProfileDto: any, // Use a DTO specific to profile fields
  ) {
    const updatedProfile = await firstValueFrom(
      this.userServiceClient.send(
        { cmd: 'updateProfile' },
        {
          userId: req.user.id,
          data: updateProfileDto,
        },
      ),
    );
    return updatedProfile;
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
      this.userServiceClient.send(
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
      this.userServiceClient.send(
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
      this.userServiceClient.send({ cmd: 'getAll' }, null),
    );
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id') id: string) {
    return new UserEntity(
      await firstValueFrom(
        this.userServiceClient.send({ cmd: 'findUser' }, { id }),
      ),
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
        this.userServiceClient.send(
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
      await firstValueFrom(
        this.userServiceClient.send({ cmd: 'removeUser' }, id),
      ),
    );
  }
}
