import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface taxasAttributes {
  id: number;
  tipo_taxa: string;
  valor: number;
}

export type taxasPk = "id";
export type taxasId = taxas[taxasPk];
export type taxasOptionalAttributes = "id";
export type taxasCreationAttributes = Optional<taxasAttributes, taxasOptionalAttributes>;

export class taxas extends Model<taxasAttributes, taxasCreationAttributes> implements taxasAttributes {
  id!: number;
  tipo_taxa!: string;
  valor!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof taxas {
    return taxas.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_taxa: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'taxas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
