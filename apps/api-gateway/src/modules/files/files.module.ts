import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryModule } from '../../modules/cloudinary/cloudinary.module';
import { CloudinaryService } from '../..//modules/cloudinary/cloudinary.service';

@Module({
  imports: [CloudinaryModule],
  providers: [FilesService, CloudinaryService],
  exports: [FilesService],
})
export class FilesModule {}
