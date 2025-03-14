import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { protocolo, protocoloId } from './protocolo';

export interface boletos_pagosAttributes {
  id: number;
  data_pagamento: string;
  protocolo: number;
}

export type boletos_pagosPk = "id";
export type boletos_pagosId = boletos_pagos[boletos_pagosPk];
export type boletos_pagosOptionalAttributes = "id";
export type boletos_pagosCreationAttributes = Optional<boletos_pagosAttributes, boletos_pagosOptionalAttributes>;

export class boletos_pagos extends Model<boletos_pagosAttributes, boletos_pagosCreationAttributes> implements boletos_pagosAttributes {
  id!: number;
  data_pagamento!: string;
  protocolo!: number;

  // boletos_pagos belongsTo protocolo via protocolo
  protocolo_protocolo!: protocolo;
  getProtocolo_protocolo!: Sequelize.BelongsToGetAssociationMixin<protocolo>;
  setProtocolo_protocolo!: Sequelize.BelongsToSetAssociationMixin<protocolo, protocoloId>;
  createProtocolo_protocolo!: Sequelize.BelongsToCreateAssociationMixin<protocolo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof boletos_pagos {
    return boletos_pagos.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data_pagamento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    protocolo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'protocolo',
        key: 'n_protocolo'
      }
    }
  }, {
    sequelize,
    tableName: 'boletos_pagos',
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
      {
        name: "protocolo.protocolo",
        using: "BTREE",
        fields: [
          { name: "protocolo" },
        ]
      },
    ]
  });
  }
}
