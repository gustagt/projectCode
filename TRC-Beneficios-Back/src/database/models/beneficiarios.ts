import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { deficiente, deficienteCreationAttributes, deficienteId } from './deficiente';
import type { documentos_pendentes, documentos_pendentesId } from './documentos_pendentes';
import type { idoso, idosoCreationAttributes, idosoId } from './idoso';
import type { protocolo, protocoloId } from './protocolo';
import { beneficiariosAttributes } from '../../interfaces/IBeneficios';



export type beneficiariosPk = "cpf";
export type beneficiariosId = beneficiarios[beneficiariosPk];
export type beneficiariosOptionalAttributes = "genero" | "telefone" | "rg" | "data_obito" | "representante_legal" | "deficiencia";
export type beneficiariosCreationAttributes = Optional<beneficiariosAttributes, beneficiariosOptionalAttributes>;

export class beneficiarios extends Model<beneficiariosAttributes, beneficiariosCreationAttributes> implements beneficiariosAttributes {
  cpf!: number;
  nome!: string;
  data_nascimento!: string;
  genero?: string;
  rua!: string;
  telefone?: number;
  celular!: number;
  rg?: string;
  data_obito?: string;
  email!: string;
  c_documentos!: string;
  representante_legal?: string;
  cep!: string;
  bairro!: string;
  cidade!: string;
  num_complemento!: string;
  deficiencia?: string;

  // beneficiarios hasOne deficiente via beneficiarios_cpf
  deficiente!: deficiente;
  getDeficiente!: Sequelize.HasOneGetAssociationMixin<deficiente>;
  setDeficiente!: Sequelize.HasOneSetAssociationMixin<deficiente, deficienteId>;
  createDeficiente!: Sequelize.HasOneCreateAssociationMixin<deficiente>;
  // beneficiarios hasMany documentos_pendentes via beneficiarios_cpf
  documentos_pendentes!: documentos_pendentes[];
  getDocumentos_pendentes!: Sequelize.HasManyGetAssociationsMixin<documentos_pendentes>;
  setDocumentos_pendentes!: Sequelize.HasManySetAssociationsMixin<documentos_pendentes, documentos_pendentesId>;
  addDocumentos_pendente!: Sequelize.HasManyAddAssociationMixin<documentos_pendentes, documentos_pendentesId>;
  addDocumentos_pendentes!: Sequelize.HasManyAddAssociationsMixin<documentos_pendentes, documentos_pendentesId>;
  createDocumentos_pendente!: Sequelize.HasManyCreateAssociationMixin<documentos_pendentes>;
  removeDocumentos_pendente!: Sequelize.HasManyRemoveAssociationMixin<documentos_pendentes, documentos_pendentesId>;
  removeDocumentos_pendentes!: Sequelize.HasManyRemoveAssociationsMixin<documentos_pendentes, documentos_pendentesId>;
  hasDocumentos_pendente!: Sequelize.HasManyHasAssociationMixin<documentos_pendentes, documentos_pendentesId>;
  hasDocumentos_pendentes!: Sequelize.HasManyHasAssociationsMixin<documentos_pendentes, documentos_pendentesId>;
  countDocumentos_pendentes!: Sequelize.HasManyCountAssociationsMixin;
  // beneficiarios hasOne idoso via beneficiarios_cpf
  idoso!: idoso;
  getIdoso!: Sequelize.HasOneGetAssociationMixin<idoso>;
  setIdoso!: Sequelize.HasOneSetAssociationMixin<idoso, idosoId>;
  createIdoso!: Sequelize.HasOneCreateAssociationMixin<idoso>;
  // beneficiarios hasMany protocolo via beneficiarios_cpf
  protocolos!: protocolo[];
  getProtocolos!: Sequelize.HasManyGetAssociationsMixin<protocolo>;
  setProtocolos!: Sequelize.HasManySetAssociationsMixin<protocolo, protocoloId>;
  addProtocolo!: Sequelize.HasManyAddAssociationMixin<protocolo, protocoloId>;
  addProtocolos!: Sequelize.HasManyAddAssociationsMixin<protocolo, protocoloId>;
  createProtocolo!: Sequelize.HasManyCreateAssociationMixin<protocolo>;
  removeProtocolo!: Sequelize.HasManyRemoveAssociationMixin<protocolo, protocoloId>;
  removeProtocolos!: Sequelize.HasManyRemoveAssociationsMixin<protocolo, protocoloId>;
  hasProtocolo!: Sequelize.HasManyHasAssociationMixin<protocolo, protocoloId>;
  hasProtocolos!: Sequelize.HasManyHasAssociationsMixin<protocolo, protocoloId>;
  countProtocolos!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof beneficiarios {
    return beneficiarios.init({
    cpf: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    rua: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    telefone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    celular: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rg: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    data_obito: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(65),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    c_documentos: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    representante_legal: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    num_complemento: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    deficiencia: {
      type: DataTypes.STRING(90),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'beneficiarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cpf" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
