'use client'
import { useState } from "react";
import { IDataDocPen } from "../interfaces/IDataDocPen";


let dadosDocPenGlobal: IDataDocPen | null = null;
let setDadosDocPenGlobal: ((data: IDataDocPen | null) => void) | null = null;

export function useDadosDocPenStore() {
  const [dadosDocPen, setDadosDocPen] = useState<IDataDocPen | null > (dadosDocPenGlobal);

  setDadosDocPenGlobal = setDadosDocPen;

  const updateDocPen = (data: IDataDocPen | null) => {
    dadosDocPenGlobal = data;
    if (setDadosDocPenGlobal) setDadosDocPenGlobal(data);
  };

  return { dadosDocPen, setDadosDocPen: updateDocPen };
}