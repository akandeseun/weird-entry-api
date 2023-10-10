import { Controller, Get, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Controller("products")
@UseGuards(AuthGuard())
export class ProductsController {
  @Get()
  getProduct() {
    return "Product Page"
  }
}
