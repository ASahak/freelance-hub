import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryService } from '../../modules/cloudinary/cloudinary.service';

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
      const result = await this.cloudinaryService.uploadImage(url);

      return (result as UploadApiResponse).secure_url || null;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      const apiError = error as UploadApiErrorResponse;
      throw new Error(apiError.message);
    }
  }

  /**
   * Uploads an image file buffer to Cloudinary.
   * @param file The file object from multer (contains buffer).
   * @returns A promise that resolves with the Cloudinary upload response.
   */
  uploadAvatarFromFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinaryService.uploadStream(
        (error, result) => {
          if (error) return reject(new Error(error.message));
          resolve(result!);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
