import {
  Body,
  Controller,
  Get,
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

  @Post("new")
  createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto)
  }
}
