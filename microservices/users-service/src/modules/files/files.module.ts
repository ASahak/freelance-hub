import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { CloudinaryModule } from '@/modules/cloudinary/cloudinary.module'

@Module({
  imports: [CloudinaryModule],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
