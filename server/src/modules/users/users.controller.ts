import {
  Body,
  Controller,
  Delete,
  Get,
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
import { UsersService } from '@/modules/users/users.service'
import { UserEntity } from '@/modules/users/entity/user.entity'
import { CreateUserDto } from '@/modules/users/dto/create-user.dto'
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard'
import { UpdateUserDto } from '@/modules/users/dto/update-user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import type { AuthenticatedRequest } from '@/common/interfaces/authenticated-request.interface'
import { FilesService } from '@/modules/files/files.service'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
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

    const updatedUser = await this.usersService.update(req.user.id, {
      avatarUrl: uploadResult.secure_url
    })

    return new UserEntity(updatedUser)
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto))
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll()
    return users.map((user) => new UserEntity(user))
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return new UserEntity((await this.usersService.findOne({ id }))!)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return new UserEntity(await this.usersService.update(id, updateUserDto))
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: string) {
    return new UserEntity(await this.usersService.remove(id))
  }
}
