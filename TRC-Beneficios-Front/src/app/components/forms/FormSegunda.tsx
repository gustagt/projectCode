'use client'

import BotaoPesquisa from "../botoes/BotaoPesquisa";
import Header from "@/app/components/header/Header";
import LabelFormInput from "../label/LabelFormInput";
import {maskCpf} from "@/lib/utils/maskCpf";
import { IBeneficiario } from "@/lib/interfaces/IBeneficiario";
import { FormEvent, useState } from "react";
import LabelFormRadio from "../label/radio/LabelFormRadio";
import formSegundaVia from "@/lib/service/segundaVia.service";
import { useRouter } from "next/navigation";
import dataBeneficiario from "@/lib/service/dataBeneficiario.service";
import { useDadosUsuarioStore } from "@/lib/store/dataBeneficiarioStore";
import { useDadosSegundaViaStore } from "@/lib/store/dataSegundaViaStore";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNBTUFjY291bnROYW1lIjoianVsbHlhbmEubWVsbyIsIm5hbWUiOiJDTj1KdWxseWFuYSBHbGF1Y2lhIGRlIG1lbG8ifSwiaWF0IjoxNzQwMzk4MzA3LCJleHAiOjE3NDA5MTY3MDd9.sWvXaffyTsd5diUtqxEsvXTsaHiwlrSD9EA4Vez7cO0'


export default function FormSegunda() {

const [beneficiario, setBeneficiario] = useState<IBeneficiario>({
    cpf: ""})


const [tipoCrd, setTipoCrd] = useState('')

const{setDadosUsuario} = useDadosUsuarioStore()
const{setDadosSegundaVia} = useDadosSegundaViaStore()

    const cpfBlur = () => {

        setBeneficiario({
            ...beneficiario,
            cpf: maskCpf(beneficiario.cpf),
        });
        
    };

    const router = useRouter()
    
    async function handleSubmit(e: FormEvent) {
      e.preventDefault()

      const resForm = await formSegundaVia.segundaVia(beneficiario.cpf, token, tipoCrd)
      const dataUser = await dataBeneficiario.dataBeneficiarioForm(beneficiario.cpf, token)

      console.log(resForm);
      
      

      
      if(resForm?.message === 'Credencial encontrada com sucesso.')  {
        setDadosUsuario(dataUser.data)
        setDadosSegundaVia(resForm.data)

        router.push("/segunda-via-status")}
        else{
          alert("Revise as informações inseridas.")
        }

  }


  return (
    <>
        <div className="flex flex-col items-center gap-1 md:gap-[180px]">
      <Header
        title={"SOLICITE A SEGUNDA VIA DA SUA CREDENCIAL"}
        text={"Solicitação de segunda via de credencial de idoso ou deficiente."} path={"/menu-beneficios"}      ></Header>
      <form onSubmit={handleSubmit} className="bg-white flex flex-col justify-center  items-center  ">
        <div className="w-[300px] space-y-5">
          <div className="flex flex-row gap-3 ">
            <LabelFormInput label={"CPF:"} colorBg={"[#EEEEEE]"} type={"text"} value={beneficiario.cpf} setValue={(e) => setBeneficiario({ ...beneficiario, cpf: e.target.value })} onBlur={cpfBlur} required maxNum={11} width="[300px]" placeHolder=" Digite um CPF somente números"></LabelFormInput>
          </div>
          <div className="flex flex-col">
            <LabelFormRadio label={"Deficiente"} value={"deficiente"} familyName={"tipoCred"} id={"deficiente"} setValue={(e) => setTipoCrd(e.target.value)} required ></LabelFormRadio>
            <LabelFormRadio label={"Idoso"} value={"idoso"} familyName={"tipoCred"} id={"idoso"} setValue={(e) => setTipoCrd(e.target.value)} required></LabelFormRadio>
          </div>
          <div className="cursor-pointer flex justify-end">
            <BotaoPesquisa name={"Solicitar"} />
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
