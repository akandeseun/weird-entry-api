import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ProductsService } from "./products.service"
import { CreateProductDto } from "./dto/create-product.dto"

@Controller("products")
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts()
  }

  @Get(":id")
  getProduct(@Param("id") id: string) {
    return this.productsService.getProductById(id)
  }

  @Post("new")
  createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto)
  }

  @Delete(":id")
  @HttpCode(204)
  deleteProduct(@Param("id") id: string) {
    return this.productsService.deleteProduct(id)
  }
}
