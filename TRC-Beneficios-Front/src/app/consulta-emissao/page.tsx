'use client'
import { useDataAcompanharProtocolStore } from "@/lib/store/dataAcompanharProtocolStore";
import StatusSegundaVia from "../components/botoes/StatusSegundaVia";
import Header from "../components/header/Header";
import { useDadosDocPenStore } from "@/lib/store/dataDocPenStore";
import LabelFile from "../components/label/file/LabelFile";
import BotaoPesquisa from "../components/botoes/BotaoPesquisa";
import { FormEvent, useState } from "react";
import { api } from "@/lib/utils/config";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNBTUFjY291bnROYW1lIjoianVsbHlhbmEubWVsbyIsIm5hbWUiOiJDTj1KdWxseWFuYSBHbGF1Y2lhIGRlIG1lbG8ifSwiaWF0IjoxNzQxMjYyOTc1LCJleHAiOjE3NDE3ODEzNzV9.SYNpy0U4xCA9KwZ-HhgsRax9Iy0Ajx9DK7rG75Phnec'

export default function ConsultaEmissao() {

  const { dataAcompanharProtocol } = useDataAcompanharProtocolStore();
  const { dadosDocPen } = useDadosDocPenStore();





  const [files, setFiles] = useState<{ docSol?: File; docResp?: File; compEnd?: File; laudo?: File; outros?: File }>({});



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [field]: e.target.files![0],
      }));
    }
  };


  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const formData = new FormData();

    if (files.docResp) formData.append("docResp", files.docResp)
    if (files.compEnd) formData.append("compEnd", files.compEnd)
    if (files.docSol) formData.append("docSol", files.docSol)
    if (files.laudo) formData.append("laudo", files.laudo)
    if (files.outros) formData.append("outros", files.outros)

    const resUpload = await fetch(`${api}/uploads/${dataAcompanharProtocol?.n_protocolo}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },

    });

    
    if (resUpload?.status === 200) {
      const body = {
        protocol: {
          id: dadosDocPen?.id,  
          status: "Aguardando Analise",    
        },
        docPen: {
          comp_residencia: dadosDocPen?.comp_residencia ?? false,
          laudo_pericial: dadosDocPen?.laudo_pericial ?? false,
          doc_representante_legal: dadosDocPen?.doc_representante_legal ?? false,
          doc_of_foto: dadosDocPen?.doc_of_foto ?? false,
          outros: dadosDocPen?.outros ?? false,
        },
      };


      const docPenId = dadosDocPen?.id; 
      const url = `${api}/docPen/id/${docPenId}`;


      const resDocPen = await fetch(url, {
        method: "PUT", 
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      console.log(resDocPen);
      
      if (resDocPen?.status === 200) {
        console.log("DocPen atualizado com sucesso!");


        
      } else {
        console.error("Erro ao atualizar o DocPen.");
      }

      
    }
    
  }
  console.log(dataAcompanharProtocol?.status);


  return (
    <>
      <div className="pb-10">
        <Header title={"ACOMPANHAMENTO DE EMISSÃO DE CREDENCIAL"} text={"Acompanhe a emissão da credencial."} path={"/consulta"}></Header>
        <div className="flex justify-center">
          <h1 className="text-2xl font-semibold">Protocolo Nº: {dataAcompanharProtocol?.n_protocolo}</h1></div>

        <div className="flex flex-col items-center p-10 ">
          <div className="">
            <StatusSegundaVia
              title={"Aguardando Análise"}
              description={"Estamos analisando sua solicitação, aguarde o retorno"}
              imageSrc={"/Chat_search.svg"}
              iconSrc={"/Check_fill.svg"}
              colorStatus={"#46494C"}
              textColor={"#E0FF41"} />
          </div>
          {dataAcompanharProtocol?.data_docpen && <>

            <div className="bg-[#46494C] w-1 h-[30px] items-center "></div>
            <div>
              <StatusSegundaVia
                title={"Documentação pendente"}
                description={"Há documentos pendentes na sua solicitação"}
                imageSrc={"/Document_Status.svg"}
                iconSrc={"/Dell_fill_light.svg"}
                colorStatus={"#46494C"}
                textColor={"#E0FF41"} />
            </div>
            <form onSubmit={handleSubmit} className="w-[320px] pl-[20px]" >

              {dadosDocPen?.comp_residencia == true && <>
                <LabelFile
                  label={"Comprovante de residência do mês vigente ou anterior. "}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={(e) => handleFileChange(e, "compEnd")}
                  nameInput={"compEnd"} /></>

              }
              {dadosDocPen?.doc_of_foto == true && <>
                <LabelFile
                  label={"Documento oficial com foto (Frente e Verso):"}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={(e) => handleFileChange(e, "docSol")}
                  nameInput={"docSol"} />
              </>}
              {dadosDocPen?.doc_representante_legal == true && <>
                <LabelFile
                  label={"Documento oficial com foto do Rep. Legal (Frente e Verso)"}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={(e) => handleFileChange(e, "docResp")}
                  nameInput={"docResp"} />
              </>

              }
              {dadosDocPen?.laudo_pericial == true && <>
                <LabelFile label={"Laudo pericial, emitido em até 06(seis) meses anteriores à data de solicitação da Credencial, exceto se a deficiência for congênita, em que o lado apresentado poderá ser de qualquer data, com assinatura do médico ou fisioterapeuta responsável pelo diagnóstico e carimbo que conste nome e número de registro do profissional no respectivo Conselho Regional."}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={(e) => handleFileChange(e, "laudo")}
                  nameInput={"laudo"} />
              </>}
              {dadosDocPen?.outros == true && <>
                <LabelFile
                  label={""}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={(e) => handleFileChange(e, "outros")}
                  nameInput={"outros"} />
              </>}
              <div className="my-[20px] grid place-items-center ">
                <BotaoPesquisa name={"Enviar"} /></div>
            </form>

          </>

          }
          {(dataAcompanharProtocol?.status == "Em Producao" || dataAcompanharProtocol?.status == "Enviado" || dataAcompanharProtocol?.status == "Finalizado") && <>
            <div className="bg-[#46494C] w-1 h-[30px] items-center ml-20"></div>
            <div>
              <StatusSegundaVia
                title={"Credencial em Produção"}
                description={"Sua credencial está sendo produzida"}
                imageSrc={"/Setting_line.svg"}
                iconSrc={"/Check_fill.svg"}
                colorStatus={"#46494C"}
                textColor={"#E0FF41"} />
            </div>
            <div className="bg-[#46494C] w-1 h-[30px] items-center ml-20"></div></>}
          {(dataAcompanharProtocol?.status == "Enviado" || dataAcompanharProtocol?.status == "Finalizado") && <>
            <div>
              <StatusSegundaVia
                title={"Enviada"}
                description={"Sua credencial foi enviada para o endereço informado"}
                imageSrc={"/package_car.svg"}
                iconSrc={"/Check_fill.svg"}
                colorStatus={"#46494C"}
                textColor={"#E0FF41"} />
            </div>
          </>}
          {dataAcompanharProtocol?.status == "Finalizado" && <>
            <div className="bg-[#46494C] w-1 h-[30px] items-center ml-20"></div>
            <div>
              <StatusSegundaVia
                title={"Entregue"}
                description={"Sua credencial foi entregue"}
                imageSrc={"/package.svg"}
                iconSrc={"/Check_fill.svg"}
                colorStatus={"#46494C"}
                textColor={"#E0FF41"} />
            </div></>}
        </div>
      </div>
    </>
  );

}