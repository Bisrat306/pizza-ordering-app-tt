import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/Item.entity';
import { Items } from './enum/items.enum';
import { ItemTypes } from './entities/ItemTypes.entity';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { ItemImages } from './entities/ItemImages.entity';
import { config } from 'dotenv';
import { UpdateItemDto } from './dto/update-item-type.dto';

config();

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(ItemTypes)
    private itemTypesRepository: Repository<ItemTypes>,
    @InjectRepository(ItemImages)
    private itemImagesRepository: Repository<ItemImages>,
  ) {}

  /**
   *
   * @param createItemTypeDto
   * @param images
   * @returns
   */
  async create(createItemTypeDto: CreateItemTypeDto, images: any) {
    const itemType = this.itemTypesRepository.create({
      item: { id: Items.PIZZA },
      name: createItemTypeDto.name,
      description: createItemTypeDto.description,
      price: createItemTypeDto.price,
    });
    await this.itemTypesRepository.save(itemType);

    images.map(async (image: any) => {
      const itemImage = this.itemImagesRepository.create({
        item: { id: Items.PIZZA },
        itemType,
        url: `http://localhost:${process.env.PORT}/${image.path}`,
        altName: createItemTypeDto.name,
      });
      await this.itemImagesRepository.save(itemImage);
    });
    const data = await this.itemTypesRepository.find({
      where: { id: itemType.id },
      relations: ['itemImages'],
    });
    return {
      message: 'Item created',
      data,
    };
  }

  /**
   * Fetches from items
   * @returns
   */
  async findAll() {
    return await this.itemTypesRepository.find({
      relations: ['itemImages'],
    });
  }

  /**
   * Fetches from item type by id
   * @param id
   */
  async findOne(id: number) {
    const itemType = await this.itemTypesRepository.find({
      where: { id },
      relations: ['itemImages'],
    });
    return itemType;
  }

  /**
   * Update item type by id
   * @param id
   */
  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.itemTypesRepository.update(id, {
      name: updateItemDto.name,
      description: updateItemDto.description,
      price: updateItemDto.price,
    });
    const itemType = await this.itemTypesRepository.find({
      where: { id },
      relations: ['itemImages'],
    });
    return itemType;
  }

  /**
   * Deletes item type by id
   * @param id
   */
  async remove(id: number) {
    await this.itemTypesRepository.delete({ id });
    return { message: 'Item deleted' };
  }
}
