// src/products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';

@Controller('products') // base route: /products
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productRepository: ProductRepository,
  ) {}

  // POST /products
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productRepository.create(createProductDto);
  }

  // GET /products
  @Get()
  findAll() {
    return this.productRepository.findAll();
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productRepository.findById(id);
  }

  // PATCH /products/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productRepository.delete(id);
  }
}
