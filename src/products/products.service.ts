import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Product } from "./models/product.model"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"

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

  async updateProduct(id, updateProductDto: UpdateProductDto) {
    const foundProduct = await this.getProductById(id)

    if (Object.keys(updateProductDto).length < 1)
      throw new BadRequestException("Body cannot be empty")

    const product = await this.productModel.update(
      { ...updateProductDto },
      { where: { foundProduct } },
    )

    return product
  }

  async deleteProduct(id: string): Promise<number> {
    const product = await this.getProductById(id)

    return await this.productModel.destroy({ where: { id: product.id } })
  }
}
