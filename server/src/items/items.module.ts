import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/Item.entity';
import { ItemImages } from './entities/ItemImages.entity';
import { ItemTypes } from './entities/ItemTypes.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, ItemImages, ItemTypes]),
    MulterModule.register({
      dest: './uploads',
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              '-' +
              uniqueSuffix +
              path.extname(file.originalname),
          );
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedFileTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ];

        if (allowedFileTypes.includes(file.mimetype)) {
          // Accept the file
          cb(null, true);
        } else {
          // Reject the file
          cb(
            new Error(
              'Invalid file type. Only JPEG, PNG, and GIF images are allowed.',
            ),
            false,
          );
        }
      },
    }),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
