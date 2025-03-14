

import type { Sequelize } from "sequelize";
import { beneficiarios as _beneficiarios } from "./beneficiarios";
import type {  beneficiariosCreationAttributes } from "./beneficiarios";
import { boletos_pagos as _boletos_pagos } from "./boletos_pagos";
import type { boletos_pagosAttributes, boletos_pagosCreationAttributes } from "./boletos_pagos";
import { deficiente as _deficiente } from "./deficiente";
import type { deficienteCreationAttributes } from "./deficiente";
import { documentos_pendentes as _documentos_pendentes } from "./documentos_pendentes";
import type {  documentos_pendentesCreationAttributes } from "./documentos_pendentes";
import { idoso as _idoso } from "./idoso";
import type {  idosoCreationAttributes } from "./idoso";
import { protocolo as _protocolo } from "./protocolo";
import type {  protocoloCreationAttributes } from "./protocolo";
import { recadastros as _recadastros } from "./recadastros";
import type { recadastrosCreationAttributes } from "./recadastros";
import { taxas as _taxas } from "./taxas";
import type { taxasAttributes, taxasCreationAttributes } from "./taxas";
import { beneficiariosAttributes } from './../../interfaces/IBeneficios';
import { protocoloAttributes } from './../../interfaces/IProtocol';
import { deficienteAttributes } from './../../interfaces/IDeficiente';
import { idosoAttributes } from './../../interfaces/IIDoso';
import { recadastrosAttributes } from './../../interfaces/IRecadastros';
import { documentos_pendentesAttributes } from './../../interfaces/IDocPen';

export {
  _beneficiarios as beneficiarios,
  _boletos_pagos as boletos_pagos,
  _deficiente as deficiente,
  _documentos_pendentes as documentos_pendentes,
  _idoso as idoso,
  _protocolo as protocolo,
  _recadastros as recadastros,
  _taxas as taxas,
};

export type {
  beneficiariosAttributes,
  beneficiariosCreationAttributes,
  boletos_pagosAttributes,
  boletos_pagosCreationAttributes,
  deficienteAttributes,
  deficienteCreationAttributes,
  documentos_pendentesAttributes,
  documentos_pendentesCreationAttributes,
  idosoAttributes,
  idosoCreationAttributes,
  protocoloAttributes,
  protocoloCreationAttributes,
  recadastrosAttributes,
  recadastrosCreationAttributes,
  taxasAttributes,
  taxasCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const beneficiarios = _beneficiarios.initModel(sequelize);
  const boletos_pagos = _boletos_pagos.initModel(sequelize);
  const deficiente = _deficiente.initModel(sequelize);
  const documentos_pendentes = _documentos_pendentes.initModel(sequelize);
  const idoso = _idoso.initModel(sequelize);
  const protocolo = _protocolo.initModel(sequelize);
  const recadastros = _recadastros.initModel(sequelize);
  const taxas = _taxas.initModel(sequelize);

  deficiente.belongsTo(beneficiarios, { as: "beneficiarios_cpf_beneficiario", foreignKey: "beneficiarios_cpf"});
  beneficiarios.hasOne(deficiente, { as: "deficiente", foreignKey: "beneficiarios_cpf"});
  documentos_pendentes.belongsTo(beneficiarios, { as: "beneficiarios_cpf_beneficiario", foreignKey: "beneficiarios_cpf"});
  beneficiarios.hasMany(documentos_pendentes, { as: "documentos_pendentes", foreignKey: "beneficiarios_cpf"});
  idoso.belongsTo(beneficiarios, { as: "beneficiarios_cpf_beneficiario", foreignKey: "beneficiarios_cpf"});
  beneficiarios.hasOne(idoso, { as: "idoso", foreignKey: "beneficiarios_cpf"});
  protocolo.belongsTo(beneficiarios, { as: "beneficiarios_cpf_beneficiario", foreignKey: "beneficiarios_cpf"});
  beneficiarios.hasMany(protocolo, { as: "protocolos", foreignKey: "beneficiarios_cpf"});
  recadastros.belongsTo(deficiente, { as: "credencial_deficiente_deficiente", foreignKey: "credencial_deficiente"});
  deficiente.hasMany(recadastros, { as: "recadastros", foreignKey: "credencial_deficiente"});
  recadastros.belongsTo(idoso, { as: "credencial_idoso_idoso", foreignKey: "credencial_idoso"});
  idoso.hasMany(recadastros, { as: "recadastros", foreignKey: "credencial_idoso"});
  boletos_pagos.belongsTo(protocolo, { as: "protocolo_protocolo", foreignKey: "protocolo"});
  protocolo.hasMany(boletos_pagos, { as: "boletos_pagos", foreignKey: "protocolo"});

  return {
    beneficiarios: beneficiarios,
    boletos_pagos: boletos_pagos,
    deficiente: deficiente,
    documentos_pendentes: documentos_pendentes,
    idoso: idoso,
    protocolo: protocolo,
    recadastros: recadastros,
    taxas: taxas,
  };
}
