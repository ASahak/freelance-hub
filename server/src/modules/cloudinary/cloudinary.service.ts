import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'

@Injectable()
export class CloudinaryService {
  uploadImage(
    filePath: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.upload(filePath, {
      public_id: Date.now().toString(),
      resource_type: 'image',
      folder: 'freelance-hub_avatars',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      transformation: [
        {
          width: 250,
          height: 250,
          gravity: 'face',
          crop: 'fill'
        }
      ],
      quality: 'auto:good',
      max_bytes: 524288 // 0.5MB
    })
  }
}
