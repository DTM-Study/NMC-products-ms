import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService  extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to database');

  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto
    }); 
  }

  async findAll(paginationDTO:PaginationDto) {
    const totalPage  = await this.product.count({where: {available: true}});

    const data  = await this.product.findMany({
      skip: (paginationDTO.page-1) * paginationDTO.limit,
      take: paginationDTO.limit, 
      where: {
        available: true
      }
    });
    
    return {
      data,
      meta: {
        totalPage, 
        page: paginationDTO.page,
        lastPage: Math.ceil(totalPage / paginationDTO.limit) 
      }
      
    }

    

  }

  async  findOne(id: number) {
    const product = await this.product.findUnique({
      where: {
        id: id, 
        available: true
      }
    });
    if (!product) throw new HttpException(`No existe producto con ID ${id}`, HttpStatus.NOT_FOUND);
    
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {id: __ , ...data  } = updateProductDto
    __
    await this.findOne(id);
    return this.product.update({
      where: {
        id: id
      },
      data
    });
     
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    product.available = false;
    return this.product.update({
      where: {
        id: id
      },
      data: product
    });
  }
}
