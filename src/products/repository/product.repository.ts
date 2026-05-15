import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../../schemas/product.schema';
import { GenericRepository } from '../../common/repository/generic.repository';

@Injectable()
export class ProductRepository extends GenericRepository<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    model: Model<ProductDocument>,
  ) {
    super(model);
  }
}
