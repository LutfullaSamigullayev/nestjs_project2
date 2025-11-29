import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto)

    return await this.productRepo.save(product)
  }

  async findAll():Promise<Product[]> {
    return this.productRepo.find()
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOneBy({id})
    if(!product) throw new NotFoundException("Product not found")
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<{message: string}> {
    const product = await this.productRepo.findOneBy({id})
    if(!product) throw new NotFoundException("Product not found")
      await this.productRepo.update(product.id, updateProductDto)
    return {message: "Updated"}
  }

  async remove(id: number): Promise<{message: string}> {
    const product = await this.productRepo.findOneBy({id})
    if(!product) throw new NotFoundException("Product not found")
      await this.productRepo.delete(product.id)
    return {message: "Deleted"}
  }
}
