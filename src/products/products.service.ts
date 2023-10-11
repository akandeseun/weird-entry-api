import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Product } from "./models/product.model"
import { CreateProductDto } from "./dto/create-product.dto"

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.findAll()
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id } })

    if (!product) throw new NotFoundException(`No product found with id ${id}`)

    return product
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create({ ...createProductDto })
    return product
  }

  async deleteProduct(id: string): Promise<number> {
    const product = await this.getProductById(id)

    return await this.productModel.destroy({ where: { id: product.id } })
  }
}
