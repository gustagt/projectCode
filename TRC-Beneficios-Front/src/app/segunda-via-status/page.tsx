'use client'

import Header from "../components/header/Header";
import LabelFormRadio from "../components/label/radio/LabelFormRadio";
import BotaoPesquisa from "../components/botoes/BotaoPesquisa";
import { FormEvent, useState } from "react";
import LabelFile from "../components/label/file/LabelFile";
import { useDadosUsuarioStore } from "@/lib/store/dataBeneficiarioStore";
import { useDadosSegundaViaStore } from "@/lib/store/dataSegundaViaStore";
import { api } from "@/lib/utils/config";
import { useRouter } from "next/navigation";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNBTUFjY291bnROYW1lIjoianVsbHlhbmEubWVsbyIsIm5hbWUiOiJDTj1KdWxseWFuYSBHbGF1Y2lhIGRlIG1lbG8ifSwiaWF0IjoxNzQwMzk4MzA3LCJleHAiOjE3NDA5MTY3MDd9.sWvXaffyTsd5diUtqxEsvXTsaHiwlrSD9EA4Vez7cO0'


export default function SegundaViaStatus() {
    const [haBoletim, setHaBoletim] = useState('')
    const [boletimOc, setBoletimOc] = useState<{boletim?:File}>({});
    const [entregaCrd, setEntregaCrd] = useState('')

    const { dadosUsuario } = useDadosUsuarioStore()
    const { dadosSegundaVia } = useDadosSegundaViaStore()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files?.[0]) {
            setBoletimOc((prevFiles) => ({
                ...prevFiles,
                [field]: e.target.files![0],
            }));
        }
    };

    const router = useRouter()
    

    async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    const formData = new FormData()

    if (boletimOc.boletim) formData.append("boletim", boletimOc.boletim)
        console.log(boletimOc);
        

    const resUpload = await fetch(`${api}/uploads/${dadosSegundaVia?.n_credencial}`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: token,
        }
    })

    if(resUpload?.status === 200) return router.push("/menu-beneficios")
        
    }


    return <>
        <div >
            <Header title={"SOLICITAÇÃO DE SEGUNDA VIA"} text={"Solicitação de segunda via de credencial de idoso ou deficiente."} path={"/segunda-via"}></Header>
        </div>
        <div className="flex flex-col items-center ">
            <div className="max-w-[900px] py-[50px] px-[8px]">
                <h1 className="font-semibold pb-2">Aviso Importante: Emissão de 2ª Via da Credencial</h1>

                <h1>Para a emissão da segunda via da credencial, <span className="font-semibold">será cobrada uma taxa</span> conforme a tabela de preços públicos vigente.</h1>

                <h1>Nos casos de furto, <span className="font-semibold">roubo ou perda</span> da credencial, é obrigatório o envio do <span className="font-semibold">Boletim de Ocorrência Policial.</span> A taxa será isenta apenas nos casos de furto ou roubo devidamente comprovados.</h1>

                <div className=" flex flex-col">

                    <h1 className="font-semibold text-2xl text-center py-[50px]">Dados da Credencial</h1>

                    <h1 className="font-semibold text-xl pb-[10px]" >Dados do solicitante</h1>
                    <h1 ><span className="font-semibold text-lg" >Nº Credencial: </span>{dadosSegundaVia?.n_credencial}</h1>
                    <h1><span className="font-semibold text-lg" >Cpf:</span> {dadosUsuario?.cpf}</h1>
                    <h1><span className="font-semibold text-lg" >Nome: </span> {dadosUsuario?.nome}</h1>
                    <form onSubmit={handleSubmit} className=" flex flex-col">
                        <h1 className="font-semibold text-xl pt-[30px] pb-[10px]">Forma de Entrega</h1>
                        <LabelFormRadio label={"Retirar na TransCon - AGUARDE CONTATO"} value={entregaCrd} familyName={"entregaCrd"} id={"entregaCrd"} setValue={(e) => setEntregaCrd(e.target.value)} required></LabelFormRadio>
                        <LabelFormRadio label={"Entrega pelos Correios"} value={entregaCrd} familyName={"entregaCrd"} id={"entregaCrd"} setValue={(e) => setEntregaCrd(e.target.value)} required></LabelFormRadio>

                        <h1 className="font-semibold text-xl pt-[30px] pb-[10px]">Possui Boletim de Ocorrência</h1>
                        <LabelFormRadio label={"Sim"} value={"sim"} familyName={"boletimOc"} id={"boletimOc"} setValue={(e) => setHaBoletim(e.target.value)} required></LabelFormRadio>
                        <LabelFormRadio label={"Nao"} value={"nao"} familyName={"boletimOc"} id={"boletimOc"} setValue={(e) => setHaBoletim(e.target.value)} required></LabelFormRadio>

                        {haBoletim === "sim" && (
                            <div>
                                <LabelFile 
                                label={"Boletim de Ocorrência"} 
                                type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."} 
                                setValue={(e) => handleFileChange(e, "boletim")} 
                                nameInput={"boletim"}
                                />
                            </div>)}
                        <div className="py-4 grid justify-items-end">
                            <BotaoPesquisa name={"Solicitar"}></BotaoPesquisa>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

}