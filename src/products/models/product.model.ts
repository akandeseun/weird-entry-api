import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"

@Table({ tableName: "products", timestamps: false })
export class Product extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string

  @Column
  name: string

  @Column
  price: number

  @Column
  description: string
}
