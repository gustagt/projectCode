import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { beneficiarios, beneficiariosId } from './beneficiarios';
import type { recadastros, recadastrosId } from './recadastros';
import { deficienteAttributes } from '../../interfaces/IDeficiente';



export type deficientePk = "n_credencial";
export type deficienteId = deficiente[deficientePk];
export type deficienteOptionalAttributes = "n_credencial" | "tipo_deficiencia" | "data_emissao" | "data_validade";
export type deficienteCreationAttributes = Optional<deficienteAttributes, deficienteOptionalAttributes>;

export class deficiente extends Model<deficienteAttributes, deficienteCreationAttributes> implements deficienteAttributes {
  n_credencial!: number;
  tipo_deficiencia?: string;
  data_emissao?: string;
  data_validade?: string;
  beneficiarios_cpf!: number;

  // deficiente belongsTo beneficiarios via beneficiarios_cpf
  beneficiarios_cpf_beneficiario!: beneficiarios;
  getBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToGetAssociationMixin<beneficiarios>;
  setBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToSetAssociationMixin<beneficiarios, beneficiariosId>;
  createBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToCreateAssociationMixin<beneficiarios>;
  // deficiente hasMany recadastros via credencial_deficiente
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

  static initModel(sequelize: Sequelize.Sequelize): typeof deficiente {
    return deficiente.init({
    n_credencial: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo_deficiencia: {
      type: DataTypes.STRING(45),
      allowNull: true
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
      unique: "fk_deficiente_beneficiarios1"
    }
  }, {
    sequelize,
    tableName: 'deficiente',
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
        name: "fk_deficiente_beneficiarios1_idx",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "beneficiarios_cpf" },
        ]
      },
    ]
  });
  }
}
