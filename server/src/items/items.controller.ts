import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Put,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ItemsRoutes } from './enum/routes.enums';
import { UpdateItemDto } from './dto/update-item-type.dto';

@ApiTags(ItemsRoutes.root)
@Controller(ItemsRoutes.root)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  /**
   * Creates menu items
   * @param id
   */
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() createItemTypeDto: CreateItemTypeDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.itemsService.create(createItemTypeDto, images);
  }

  /**
   * Fetches all served items
   * @param id
   */
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  /**
   * Fetche item by id
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  /**
   * Updates item type
   * @param id
   * @param updateItemDto
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  /**
   * Deletes item type
   * @param id
   */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
