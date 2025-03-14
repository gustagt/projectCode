'use client'

import BotaoPesquisa from "../botoes/BotaoPesquisa";
import Header from "@/app/components/header/Header";
import LabelFormInput from "../label/LabelFormInput";
import {maskCpf} from "@/lib/utils/maskCpf";
import { FormEvent, useState } from "react";
import { IProtocolos } from "@/lib/interfaces/IProtocolos";
import protocolService from "@/lib/service/protocol.service";
import { useRouter } from "next/navigation";
import { useDataAcompanharProtocolStore } from "@/lib/store/dataAcompanharProtocolStore";
import docPenCredencial from "@/lib/service/docPen.service";
import { useDadosDocPenStore } from "@/lib/store/dataDocPenStore";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNBTUFjY291bnROYW1lIjoianVsbHlhbmEubWVsbyIsIm5hbWUiOiJDTj1KdWxseWFuYSBHbGF1Y2lhIGRlIG1lbG8ifSwiaWF0IjoxNzM5Nzk5OTg5LCJleHAiOjE3NDAzMTgzODl9.atDPxZRmGhkjOPlgpSRAbOy2MTEbGCdGgMLh7pfklwU'


export default function FormProtocolo() {

const [protocolo, setProtocolo] = useState<IProtocolos>({
  protocolo:"",
  cpf:""
})

const { setDataAcompanharProtocol } = useDataAcompanharProtocolStore();
const{setDadosDocPen} = useDadosDocPenStore();

const cpfBlur = () => {

    setProtocolo({
        ...protocolo,
        cpf: maskCpf(protocolo.cpf),
    });
        
};


    const router = useRouter()

    async function handleSubmit(e: FormEvent){
      e.preventDefault()
    
      const resUsuario = await protocolService.postProtocol(protocolo,token)
      const docPen = await docPenCredencial.docPen(protocolo.cpf, token)
      console.log(docPen);
      
      if(resUsuario?.status === 200) { 
        setDataAcompanharProtocol(resUsuario.data[0])
        setDadosDocPen(docPen.data)
        router.push("/consulta-emissao")}
  
    }


  return (
    <>
    <div className="flex flex-col items-center gap-1 md:gap-[180px]">

      <Header
        title={"ACOMPANHAMENTO DE EMISSÃO DE CREDENCIAL"}
        text={"Acompanhe a emissão de credencial"}
        path={"/menu-beneficios"}
      ></Header>
      
           <form onSubmit={handleSubmit} className="flex flex-col justify-items-center items-center">
        <div className="bg-white w-[300px]   space-y-2">
          <div className=" ">
            <LabelFormInput width="[300px]" label={"Nº Protocolo:"} colorBg={"[#EEEEEE]"} type={"text"} value={protocolo.protocolo} setValue={(e) => setProtocolo({ ...protocolo, protocolo: e.target.value })} required></LabelFormInput>
          </div>
          <div className="">
          <LabelFormInput width="[300px]" label={"CPF:"} colorBg={"[#EEEEEE]"} type={"text"} value={protocolo.cpf} setValue={(e) => setProtocolo({ ...protocolo, cpf: e.target.value })} onBlur={cpfBlur} required maxNum={11} placeHolder=" Digite um CPF somente números"></LabelFormInput>
          </div>
          <div className="cursor-pointer w-full flex justify-end pt-3">
            <BotaoPesquisa name={"Pesquisar"} />
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
