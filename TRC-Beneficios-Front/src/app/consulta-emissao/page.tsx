'use client'
import { useDataAcompanharProtocolStore } from "@/lib/store/dataAcompanharProtocolStore";
import StatusSegundaVia from "../components/botoes/StatusSegundaVia";
import Header from "../components/header/Header";
import { useDadosDocPenStore } from "@/lib/store/dataDocPenStore";
import LabelFile from "../components/label/file/LabelFile";
import BotaoPesquisa from "../components/botoes/BotaoPesquisa";
export default function ConsultaEmissao() {

  const { dataAcompanharProtocol } = useDataAcompanharProtocolStore();
  const { dadosDocPen } = useDadosDocPenStore();
  console.log(dadosDocPen);


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

            <div className="bg-[#46494C] w-1 h-[30px] items-center ml-20"></div>
            <StatusSegundaVia
              title={"Documentação pendente"}
              description={"Há documentos pendentes na sua solicitação"}
              imageSrc={"/Document_Status.svg"}
              iconSrc={"/Dell_fill_light.svg"}
              colorStatus={"#46494C"}
              textColor={"#E0FF41"} />
            <form className="w-[340px] pl-[60px]">
              {dadosDocPen?.comp_residencia == true && <>
                <LabelFile
                  label={"Comprovante de residência do mês vigente ou anterior. "}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={""}
                  nameInput={""} /></>}
              {dadosDocPen?.doc_of_foto == true && <>
                <LabelFile
                  label={"Documento oficial com foto (Frente e Verso):"}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={""}
                  nameInput={""} />
              </>}
              {dadosDocPen?.doc_representante_legal == true && <>
                <LabelFile
                  label={"Documento oficial com foto do Rep. Legal (Frente e Verso)"}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={""}
                  nameInput={""} />
              </>
              }
              {dadosDocPen?.laudo_pericial == true && <>
                <LabelFile label={"Laudo pericial, emitido em até 06(seis) meses anteriores à data de solicitação da Credencial, exceto se a deficiência for congênita, em que o lado apresentado poderá ser de qualquer data, com assinatura do médico ou fisioterapeuta responsável pelo diagnóstico e carimbo que conste nome e número de registro do profissional no respectivo Conselho Regional."}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={""}
                  nameInput={""} />
              </>}
              {dadosDocPen?.outros == true && <>
                <LabelFile
                  label={""}
                  asterisco={"*"}
                  type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                  setValue={""}
                  nameInput={""} />
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