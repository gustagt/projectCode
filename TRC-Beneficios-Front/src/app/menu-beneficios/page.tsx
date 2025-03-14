import BotaoMenu from "@/app/components/botoes/BotaoMenu";
import Header from "../components/header/Header";

export default function MenuBeneficio() {
  return (
    <div className="h-screen   ">
      <div className="flex flex-col items-center gap-1 md:gap-[180px] ">
        <Header
          title={"CREDENCIAL DE ESTACIONAMENTO "}
          text={"Sistema destinado a solicitação de credencial de estacionamento para pessoas PCD ou Idosos "}
          path={"https://www.transcon.contagem.mg.gov.br/portal/servicos/1003/credencial-de-estacionamento/"}
        ></Header>{" "}

        <div className="flex flex-wrap justify-center items-center text-2xl gap-5 md:gap-10 ">
          <div className="w-[340]  "><BotaoMenu
            name={"CREDENCIAL PCD"}
            icon={"/PCD.svg"}
            path={"/formulario-deficiente"}
          ></BotaoMenu>{" "}
            <div className="text-justify hidden md:block">
              <h1>Solicitar nova credencial para idoso</h1></div></div>
          <div className="w-[340]"><BotaoMenu
            name={"CREDENCIAL IDOSO"}
            icon={"/idoso.svg"}
            path={"/formulario-idoso"}
          ></BotaoMenu>{" "}
            <div className="text-justify hidden md:block"><h1>Solicitar nova credencial para pessoa com deficiência</h1></div></div>
          <div className="w-[340]"><BotaoMenu
            name={"ACOMPANHAR PROTOCOLO"}
            icon={"/lupa.svg"}
            path={"/consulta"}
          ></BotaoMenu>{" "}
            <div className="text-justify hidden md:block "><h1>Acompanhar solicitação de credencial</h1></div></div>
          <div className="w-[340]"><BotaoMenu
            name={"SOLICITAR SEGUNDA VIA"}
            icon={"/2ª via.svg"}
            path={"/segunda-via"}
          ></BotaoMenu>{" "}
            <div className="text-justify hidden md:block"><h1>Solicitar segunda via de credencial</h1></div>
          </div>
        </div>
      </div>
    </div>
  );
}
