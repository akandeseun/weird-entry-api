import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript"

@Table({ tableName: "users", timestamps: false })
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string

  @Column({
    unique: true,
  })
  email: string

  @Column
  password: string

  @Column
  firstName: string

  @Column
  lastName: string

  @Column({
    unique: true,
  })
  phoneNumber: string

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: boolean
}
