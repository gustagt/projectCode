import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { beneficiarios, beneficiariosId } from './beneficiarios';
import { documentos_pendentesAttributes } from '../../interfaces/IDocPen';


export type documentos_pendentesPk = "id";
export type documentos_pendentesId = documentos_pendentes[documentos_pendentesPk];
export type documentos_pendentesOptionalAttributes = "id" | "comp_residencia" | "laudo_pericial" | "doc_representante_legal" | "doc_of_foto" | "outros";
export type documentos_pendentesCreationAttributes = Optional<documentos_pendentesAttributes, documentos_pendentesOptionalAttributes>;

export class documentos_pendentes extends Model<documentos_pendentesAttributes, documentos_pendentesCreationAttributes> implements documentos_pendentesAttributes {
  id!: number;
  comp_residencia?: number;
  laudo_pericial?: number;
  doc_representante_legal?: number;
  doc_of_foto?: number;
  outros?: number;
  beneficiarios_cpf!: number;

  // documentos_pendentes belongsTo beneficiarios via beneficiarios_cpf
  beneficiarios_cpf_beneficiario!: beneficiarios;
  getBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToGetAssociationMixin<beneficiarios>;
  setBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToSetAssociationMixin<beneficiarios, beneficiariosId>;
  createBeneficiarios_cpf_beneficiario!: Sequelize.BelongsToCreateAssociationMixin<beneficiarios>;

  static initModel(sequelize: Sequelize.Sequelize): typeof documentos_pendentes {
    return documentos_pendentes.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comp_residencia: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    laudo_pericial: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    doc_representante_legal: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    doc_of_foto: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    outros: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    beneficiarios_cpf: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'beneficiarios',
        key: 'cpf'
      }
    }
  }, {
    sequelize,
    tableName: 'documentos_pendentes',
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
        name: "ben.cpf",
        using: "BTREE",
        fields: [
          { name: "beneficiarios_cpf" },
        ]
      },
    ]
  });
  }
}
