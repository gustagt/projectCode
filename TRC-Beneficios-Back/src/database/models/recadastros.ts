import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { deficiente, deficienteId } from './deficiente';
import type { idoso, idosoId } from './idoso';
import { recadastrosAttributes } from '../../interfaces/IRecadastros';



export type recadastrosPk = "id";
export type recadastrosId = recadastros[recadastrosPk];
export type recadastrosOptionalAttributes = "id" | "credencial_idoso" | "credencial_deficiente" | "recadastro_1" | "recadastro_2" | "recadastro_3" | "recadastro_4" | "recadastro_5";
export type recadastrosCreationAttributes = Optional<recadastrosAttributes, recadastrosOptionalAttributes>;

export class recadastros extends Model<recadastrosAttributes, recadastrosCreationAttributes> implements recadastrosAttributes {
  id!: number;
  credencial_idoso?: number;
  credencial_deficiente?: number;
  recadastro_1?: string;
  recadastro_2?: string;
  recadastro_3?: string;
  recadastro_4?: string;
  recadastro_5?: string;

  // recadastros belongsTo deficiente via credencial_deficiente
  credencial_deficiente_deficiente!: deficiente;
  getCredencial_deficiente_deficiente!: Sequelize.BelongsToGetAssociationMixin<deficiente>;
  setCredencial_deficiente_deficiente!: Sequelize.BelongsToSetAssociationMixin<deficiente, deficienteId>;
  createCredencial_deficiente_deficiente!: Sequelize.BelongsToCreateAssociationMixin<deficiente>;
  // recadastros belongsTo idoso via credencial_idoso
  credencial_idoso_idoso!: idoso;
  getCredencial_idoso_idoso!: Sequelize.BelongsToGetAssociationMixin<idoso>;
  setCredencial_idoso_idoso!: Sequelize.BelongsToSetAssociationMixin<idoso, idosoId>;
  createCredencial_idoso_idoso!: Sequelize.BelongsToCreateAssociationMixin<idoso>;

  static initModel(sequelize: Sequelize.Sequelize): typeof recadastros {
    return recadastros.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    credencial_idoso: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'idoso',
        key: 'n_credencial'
      }
    },
    credencial_deficiente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'deficiente',
        key: 'n_credencial'
      }
    },
    recadastro_1: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    recadastro_2: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    recadastro_3: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    recadastro_4: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    recadastro_5: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'recadastros',
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
        name: "credencial.idoso",
        using: "BTREE",
        fields: [
          { name: "credencial_idoso" },
        ]
      },
      {
        name: "credencial.deficiente",
        using: "BTREE",
        fields: [
          { name: "credencial_deficiente" },
        ]
      },
    ]
  });
  }
}
