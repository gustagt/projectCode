import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { beneficiarios, beneficiariosId } from './beneficiarios';
import type { recadastros, recadastrosId } from './recadastros';
import { idosoAttributes } from '../../interfaces/IIDoso';



export type idosoPk = "n_credencial";
export type idosoId = idoso[idosoPk];
export type idosoOptionalAttributes = "n_credencial" | "data_emissao" | "data_validade";
export type idosoCreationAttributes = Optional<idosoAttributes, idosoOptionalAttributes>;

export class idoso extends Model<idosoAttributes, idosoCreationAttributes> implements idosoAttributes {
  n_credencial!: number;
  data_emissao?: string;
  data_validade?: string;
  beneficiarios_cpf!: number;

  // idoso belongsTo beneficiarios via beneficiarios_cpf
  beneficiarios_cpf_beneficiario!: beneficiarios;
  getBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToGetAssociationMixin<beneficiarios>;
  setBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToSetAssociationMixin<beneficiarios, beneficiariosId>;
  createBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToCreateAssociationMixin<beneficiarios>;
  // idoso hasMany recadastros via credencial_idoso
  recadastros!: recadastros[];
  getRecadastros!: Sequelize.HasManyGetAssociationsMixin<recadastros>;
  setRecadastros!: Sequelize.HasManySetAssociationsMixin<recadastros, recadastrosId>;
  addRecadastro!: Sequelize.HasManyAddAssociationMixin<recadastros, recadastrosId>;
  addRecadastros!: Sequelize.HasManyAddAssociationsMixin<recadastros, recadastrosId>;
  createRecadastro!: Sequelize.HasManyCreateAssociationMixin<recadastros>;
  removeRecadastro!: Sequelize.HasManyRemoveAssociationMixin<recadastros, recadastrosId>;
  removeRecadastros!: Sequelize.HasManyRemoveAssociationsMixin<recadastros, recadastrosId>;
  hasRecadastro!: Sequelize.HasManyHasAssociationMixin<recadastros, recadastrosId>;
  hasRecadastros!: Sequelize.HasManyHasAssociationsMixin<recadastros, recadastrosId>;
  countRecadastros!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof idoso {
    return idoso.init({
    n_credencial: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    data_emissao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    data_validade: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    beneficiarios_cpf: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'beneficiarios',
        key: 'cpf'
      },
      unique: "fk_idoso_beneficiarios"
    }
  }, {
    sequelize,
    tableName: 'idoso',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "n_credencial" },
        ]
      },
      {
        name: "beneficiarios_cpf",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "beneficiarios_cpf" },
        ]
      },
      {
        name: "fk_idoso_beneficiarios_idx",
        using: "BTREE",
        fields: [
          { name: "beneficiarios_cpf" },
        ]
      },
    ]
  });
  }
}
