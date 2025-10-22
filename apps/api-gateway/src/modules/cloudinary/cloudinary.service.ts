import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  UploadResponseCallback,
  v2,
} from 'cloudinary';

const baseConfigs = {
  resource_type: 'image' as UploadApiOptions['resource_type'] | undefined,
  folder: 'freelance-hub_avatars',
  allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  transformation: [
    {
      width: 250,
      height: 250,
      gravity: 'face',
      crop: 'fill',
    },
  ],
  quality: 'auto:good',
  max_bytes: 524288, // 0.5MB
};
@Injectable()
export class CloudinaryService {
  uploadImage(
    filePath: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.upload(filePath, {
      public_id: Date.now().toString(),
      ...baseConfigs,
    });
  }

  uploadStream(cb: UploadResponseCallback) {
    return v2.uploader.upload_stream(
      {
        public_id: Date.now().toString(),
        ...baseConfigs,
      },
      cb,
    );
  }
}
