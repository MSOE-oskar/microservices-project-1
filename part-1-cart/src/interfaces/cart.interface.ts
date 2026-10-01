import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsDecimal,
  IsArray,
} from 'class-validator';
export class Category {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class Product {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  usdPrice: number;

  @IsNotEmpty()
  @IsArray()
  categories: Category[];
}

export class Cart {
  products: Product[];
}
