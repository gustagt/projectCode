'use client'
import { useState } from "react";
import { IDataSegundaVia } from "../interfaces/IDataSegundaVia";


let dadosSegundaViaGlobal: IDataSegundaVia | null = null;
let setDadosSegundaViaGlobal: ((data: IDataSegundaVia | null) => void) | null = null;

export function useDadosSegundaViaStore() {
  const [dadosSegundaVia, setDadosSegundaVia] = useState<IDataSegundaVia | null > (dadosSegundaViaGlobal);

  setDadosSegundaViaGlobal = setDadosSegundaVia;

  const updateDadosSegundaVia = (data: IDataSegundaVia | null) => {
    dadosSegundaViaGlobal = data;
    if (setDadosSegundaViaGlobal) setDadosSegundaViaGlobal(data);
  };

  return { dadosSegundaVia, setDadosSegundaVia: updateDadosSegundaVia };
}