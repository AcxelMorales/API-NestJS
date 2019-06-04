import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, Query, NotFoundException } from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly _productService: ProductService
    ) { }

    @Get('/')
    async getProducts(@Res() res): Promise<Object[]> {
        const products = await this._productService.getProducts();

        if (!products) {
            return res.status(500).json({
                ok: false,
                err: 'Error al buscar los productos'
            });
        }

        return res.status(HttpStatus.OK).json({
            ok: true,
            products
        });
    }

    @Get(':id')
    async getProducto(@Res() res, @Param('id') id): Promise<Object> {
        const product = await this._productService.getProduct(id);

        if (!product) {
            return res.status(500).json({
                ok: false,
                err: `Error al buscar el producto con el id: ${id}`
            });
        }

        return res.status(HttpStatus.OK).json({
            ok: true,
            product
        });
    }


    @Post('/create')
    async postProduct(@Res() res, @Body() createProductDTO: CreateProductDTO): Promise<Object> {
        const newProduct = await this._productService.postProduct(createProductDTO);

        if (!newProduct) {
            return res.status(500).json({
                ok: false,
                err: 'Error al crear el producto'
            });
        }

        return res.status(HttpStatus.OK).json({
            ok: true,
            product: newProduct
        });
    }

    @Put(':id')
    async putProduct(
        @Res() res,
        @Body() createProductDTO: CreateProductDTO,
        @Param('id') id: string
    ): Promise<Object> {
        const productUpdate = await this._productService.putProduct(id, createProductDTO);

        if (!productUpdate) {
            return res.status(500).json({
                ok: false,
                err: 'Error al crear el producto'
            });
        }

        return res.status(HttpStatus.OK).json({
            ok: true,
            product: productUpdate
        });
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('id') id): Promise<Object> {
        const deleteProduct = await this._productService.deleteProduct(id);
        if (!deleteProduct) throw new NotFoundException(`No existe un producto con el id: ${id}`);

        return res.status(HttpStatus.OK).json({
            ok: true,
            product: deleteProduct
        });
    }

}
