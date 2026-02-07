import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('upload') // La ruta será: localhost:3000/upload
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // El campo en Postman se debe llamar 'file'
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // Validamos que sea una imagen y no pase de 4MB
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Llamamos al servicio que creamos antes
    const result = await this.cloudinaryService.uploadFile(file);
    // Retornamos la URL segura y el ID público que nos da Cloudinary
    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
    };
  }
}
