import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import { CloudinaryService } from '@/modules/cloudinary/cloudinary.service'

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  /**
   * Uploads an image from a URL to Cloudinary.
   * @param url The URL of the image to upload.
   * @returns The secure URL of the uploaded image in Cloudinary.
   */
  async uploadAvatarFromUrl(url: string): Promise<string | null> {
    try {
      const result = await this.cloudinaryService.uploadImage(url)

      return (result as UploadApiResponse).secure_url || null
    } catch (error) {
      console.error('Cloudinary upload failed:', error)
      // We cast the error to get better type info
      const apiError = error as UploadApiErrorResponse
      throw new Error(apiError.message)
    }
  }
}
