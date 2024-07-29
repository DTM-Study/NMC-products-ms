import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNumber({}, {
            message: 'El campo id debe ser un número'
    })
    @IsNotEmpty({
        message: 'El campo id es obligatorio'
    })
    id: number;
}
