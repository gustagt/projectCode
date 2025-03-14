'use client'
import { useState } from "react";
import { IDataProtocol } from "../interfaces/IDataProtocol";


let dataAcompanharProtocolGlobal: IDataProtocol | null = null;
let setDataAcompanharProtocolGlobal: ((data: IDataProtocol | null) => void) | null = null;

export function useDataAcompanharProtocolStore() {
  const [dataAcompanharProtocol, setDataAcompanharProtocol] = useState<IDataProtocol | null > (dataAcompanharProtocolGlobal);

  setDataAcompanharProtocolGlobal = setDataAcompanharProtocol;

  const updateDataAcompanharProtocol = (data: IDataProtocol | null) => {
    dataAcompanharProtocolGlobal = data;
    if (setDataAcompanharProtocolGlobal) setDataAcompanharProtocolGlobal(data);
  };

  return { dataAcompanharProtocol: dataAcompanharProtocol, setDataAcompanharProtocol: updateDataAcompanharProtocol };
}