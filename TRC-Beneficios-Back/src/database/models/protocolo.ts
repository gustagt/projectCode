import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { beneficiarios, beneficiariosId } from './beneficiarios';
import type { boletos_pagos, boletos_pagosId } from './boletos_pagos';
import { protocoloAttributes } from '../../interfaces/IProtocol';


export type protocoloPk = "n_protocolo";
export type protocoloId = protocolo[protocoloPk];
export type protocoloOptionalAttributes = "n_protocolo" | "data_docpen" | "data_producao" | "data_enviado" | "data_entregue" | "observacoes" | "entrega_crd";
export type protocoloCreationAttributes = Optional<protocoloAttributes, protocoloOptionalAttributes>;

export class protocolo extends Model<protocoloAttributes, protocoloCreationAttributes> implements protocoloAttributes {
  n_protocolo!: number;
  servico!: string;
  status!: string;
  beneficiarios_cpf!: number;
  tipo!: string;
  data_analise!: Date;
  data_docpen?: Date;
  data_producao?: Date;
  data_enviado?: Date;
  data_entregue?: Date;
  observacoes?: string;
  entrega_crd!: number;

  // protocolo belongsTo beneficiarios via beneficiarios_cpf
  beneficiarios_cpf_beneficiario!: beneficiarios;
  getBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToGetAssociationMixin<beneficiarios>;
  setBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToSetAssociationMixin<beneficiarios, beneficiariosId>;
  createBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToCreateAssociationMixin<beneficiarios>;
  // protocolo hasMany boletos_pagos via protocolo
  boletos_pagos!: boletos_pagos[];
  getBoletos_pagos!: Sequelize.HasManyGetAssociationsMixin<boletos_pagos>;
  setBoletos_pagos!: Sequelize.HasManySetAssociationsMixin<boletos_pagos, boletos_pagosId>;
  addBoletos_pago!: Sequelize.HasManyAddAssociationMixin<boletos_pagos, boletos_pagosId>;
  addBoletos_pagos!: Sequelize.HasManyAddAssociationsMixin<boletos_pagos, boletos_pagosId>;
  createBoletos_pago!: Sequelize.HasManyCreateAssociationMixin<boletos_pagos>;
  removeBoletos_pago!: Sequelize.HasManyRemoveAssociationMixin<boletos_pagos, boletos_pagosId>;
  removeBoletos_pagos!: Sequelize.HasManyRemoveAssociationsMixin<boletos_pagos, boletos_pagosId>;
  hasBoletos_pago!: Sequelize.HasManyHasAssociationMixin<boletos_pagos, boletos_pagosId>;
  hasBoletos_pagos!: Sequelize.HasManyHasAssociationsMixin<boletos_pagos, boletos_pagosId>;
  countBoletos_pagos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof protocolo {
    return protocolo.init({
    n_protocolo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    servico: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    beneficiarios_cpf: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'beneficiarios',
        key: 'cpf'
      }
    },
    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    data_analise: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_docpen: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data_producao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data_enviado: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data_entregue: {
      type: DataTypes.DATE,
      allowNull: true
    },
    observacoes: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    entrega_crd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'protocolo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "n_protocolo" },
        ]
      },
      {
        name: "fk_protocolo_beneficiarios1_idx",
        using: "BTREE",
        fields: [
          { name: "beneficiarios_cpf" },
        ]
      },
    ]
  });
  }
}
