import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ProductsService } from "./products.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"

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

  @Patch(":id")
  updateProduct(
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
    @Param("id") id: string,
  ) {
    return this.productsService.updateProduct(id, updateProductDto)
  }

  @Delete(":id")
  @HttpCode(204)
  deleteProduct(@Param("id") id: string) {
    return this.productsService.deleteProduct(id)
  }
}
