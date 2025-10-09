import {
  Body,
  Controller,
  Delete,
  Get, Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody
} from '@nestjs/swagger'
import { firstValueFrom } from 'rxjs';
import { UserEntity } from '@/modules/users/entity/user.entity'
import { JwtAuthGuard } from '@/guards/jwt-auth.guard'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import type { AuthenticatedRequest } from '@/common/interfaces/authenticated-request.interface'
import { ClientProxy } from '@nestjs/microservices'
import { FilesService } from '@/modules/files/files.service';
import { MICROSERVICES } from '@shared/constants/microservices';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    @Inject(MICROSERVICES.Users.name) private readonly userServiceClient: ClientProxy,
    private readonly filesService: FilesService
  ) {}

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
          format: 'binary'
        }
      }
    }
  })
  async uploadAvatar(
    @Req() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ): Promise<UserEntity> {
    const uploadResult = await this.filesService.uploadAvatarFromFile(file)

    const updatedUser = await firstValueFrom(this.userServiceClient.send({ cmd: 'uploadAvatar' }, {
      id: req.user.id,
      avatarUrl: uploadResult.secure_url
    }))

    return new UserEntity(updatedUser)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getAll() {
    const users = await firstValueFrom(this.userServiceClient.send({ cmd: 'getAll' }, null))
    return users.map((user) => new UserEntity(user))
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id', ParseIntPipe) id: string) {
    return new UserEntity(await firstValueFrom(this.userServiceClient.send({ cmd: 'findUser' }, id)))
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return new UserEntity(await firstValueFrom(this.userServiceClient.send({ cmd: 'updateUser' }, { id, updateUserDto })))
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async removeUser(@Param('id', ParseIntPipe) id: string) {
    return new UserEntity(await firstValueFrom(this.userServiceClient.send({ cmd: 'removeUser' }, id)))
  }
}
