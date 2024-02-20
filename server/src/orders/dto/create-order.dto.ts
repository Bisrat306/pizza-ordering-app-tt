import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  IsObject,
  IsNumber,
  IsString,
  IsEmail,
} from 'class-validator';

export class OrderedItemsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderedItemsDto] })
  @IsNotEmpty()
  @IsArray()
  @IsObject({ each: true })
  items: OrderedItemsDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNo: string;
}
