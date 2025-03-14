'use client'
import { useState } from "react";
import { IDataBeneficiario } from "../interfaces/IDataBeneficiario";


let dadosUsuarioGlobal: IDataBeneficiario | null = null;
let setDadosUsuarioGlobal: ((data: IDataBeneficiario | null) => void) | null = null;

export function useDadosUsuarioStore() {
  const [dadosUsuario, setDadosUsuario] = useState<IDataBeneficiario | null > (dadosUsuarioGlobal);

  setDadosUsuarioGlobal = setDadosUsuario;

  const updateDadosUsuario = (data: IDataBeneficiario | null) => {
    dadosUsuarioGlobal = data;
    if (setDadosUsuarioGlobal) setDadosUsuarioGlobal(data);
  };

  return { dadosUsuario, setDadosUsuario: updateDadosUsuario };
}