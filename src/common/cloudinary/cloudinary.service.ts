import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    console.log(
      'Intentando subir con Cloud Name:',
      cloudinary.config().cloud_name,
    );
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error)
          return reject(
            new Error(error.message || 'Clodudinary upload failed'),
          );
        if (!result) return reject(new Error('Cloudinary result is undefined'));
        resolve(result);
      });

      // Convertimos el buffer del archivo en un stream para enviarlo
      Readable.from(file.buffer).pipe(upload);
    });
  }
}
