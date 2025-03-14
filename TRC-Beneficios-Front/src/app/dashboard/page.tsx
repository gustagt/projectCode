'use client'
import Image from "next/image";
import LabelFormInput from "../components/label/LabelFormInput";
import LabelFormRadio from "../components/label/radio/LabelFormRadio";
import beneficiarioInfo from "@/lib/service/allBeneficiarios.service";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/utils/config";
import { useRouter } from "next/navigation";



type Beneficiario = {
    n_protocolo: string;
    beneficiarios_cpf_beneficiario: {
        nome: string;
    };
    beneficiarios_cpf: string;
    servico: string;
    tipo: string;
    status: string;
};


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNBTUFjY291bnROYW1lIjoianVsbHlhbmEubWVsbyIsIm5hbWUiOiJDTj1KdWxseWFuYSBHbGF1Y2lhIGRlIG1lbG8ifSwiaWF0IjoxNzQxMjYyOTc1LCJleHAiOjE3NDE3ODEzNzV9.SYNpy0U4xCA9KwZ-HhgsRax9Iy0Ajx9DK7rG75Phnec'

export default function Dashboard() {

    const [dados, setDados] = useState<Beneficiario[]>([]);
    const [search, setSearch] = useState('');
    const [dadosretornados, setDadosRetornados] = useState<Beneficiario[]>([]);
    const [selecaoDashboard, setSelecaoDashboard] = useState('');
    const [retornoSearchRadio, setRetornoSearchRadio] = useState<Beneficiario[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageLimit = 10;


    const buscarDados = async (page: number) => {

        const datas = await beneficiarioInfo.allBeneficiario(token, page);

        if (datas?.status === 200) {
            setDados(datas.data);
            setTotalPages(datas.pages);
        }
    };


    useEffect(() => {
        buscarDados(currentPage);
    }, [currentPage]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);


    async function searchInfo() {



        const resposta = await fetch(`${api}/protocolo/search/${search}`, {
            method: "GET",
            headers: {
                Authorization: token,
            },

        });




        const dados = await resposta.json();
        setDadosRetornados(dados.data);



    }

    const searchRadioInput = useCallback(async () => {

        const searchInput = await fetch(`${api}/protocolo?page=${currentPage}&query=${selecaoDashboard}`, {
            method: "GET",
            headers: {
                Authorization: token,
            },

        })
        const retorno = await searchInput.json();

        console.log(retorno);
        
        setRetornoSearchRadio(retorno.data);
        setTotalPages(retorno.pages)

    }, [selecaoDashboard, currentPage])

    useEffect(() => {
        searchRadioInput();
    }, [searchRadioInput]);

    const router = useRouter()

    function solicitacaoBeneficiario () {
        router.push("/menu-beneficios")
    }

    const reloadPage = () => {

        router.refresh()
        setSearch('')
        setSelecaoDashboard('')
    }

    const dadosExibidos = dadosretornados.length > 0 || retornoSearchRadio.length > 0 ?
        (dadosretornados.length > 0 ? dadosretornados : retornoSearchRadio) : dados;

    return (
        <>
            <div className="w-full">
                <div className="flex flex justify-between mb-3 pt-[13px] pr-[70px] w-full ">
                    <div className="flex flex-row gap-4 pl-[70px]">
                        <h1 className="cursor-pointer" onClick={() => { }}>Credenciais</h1>
                        <h1 className="cursor-pointer">Protocolos</h1>
                    </div>
                    <div className="flex flex-row gap-4 pl-10 ">
                        <LabelFormRadio
                            label={"Idoso"}
                            value={"idoso"}
                            familyName={"selecaoDashboard"}
                            id={""}
                            setValue={(e) => { setSelecaoDashboard(e.target.value) }}
                            clickEvent={searchRadioInput}

                        />
                        <LabelFormRadio
                            label={"Deficiente"}
                            value={"deficiente"}
                            familyName={"selecaoDashboard"}
                            id={""}
                            setValue={(e) => { setSelecaoDashboard(e.target.value) }}
                            clickEvent={searchRadioInput}

                        />
                        <LabelFormRadio
                            label={"2ª Via"}
                            value={"segunda via"}
                            familyName={"selecaoDashboard"}
                            id={""}
                            setValue={(e) => { setSelecaoDashboard(e.target.value) }}
                            clickEvent={searchRadioInput}

                        />
                        <LabelFormRadio
                            label={"Finalizados"}
                            value={"finalizado"}
                            familyName={"selecaoDashboard"}
                            id={""}
                            setValue={(e) => { setSelecaoDashboard(e.target.value) }}
                            clickEvent={searchRadioInput}
                        />
                    </div>
                    <div className="flex flex-row pl-10" >
                        <LabelFormInput
                            label={""}
                            colorBg={""}
                            type={"text"}
                            value={search}
                            setValue={(e) => { setSearch(e.target.value) }}
                            border="black"
                        />
                        <div className="w-[35px] h-[35px] mr-2">
                            <button type="submit" onClick={searchInfo}>
                                <Image
                                    alt="search"
                                    src="/search_dashboard.svg"
                                    width={0}
                                    height={0}
                                    sizes="100vw"

                                    style={{ width: '100%', height: 'auto' }}
                                /></button>
                        </div>
                        <div className="w-[35px] h-[35px] ">
                            <button type="submit" onClick={reloadPage}>
                                <Image
                                    alt="search"
                                    src="/refreshPage.svg"
                                    width={0}
                                    height={0}
                                    sizes="100vw"

                                    style={{ width: '100%', height: 'auto' }}
                                /></button>
                        </div></div>
                    <div className="flex flex-row pl-10" >
                        <div className=" w-[25px] h-[25px]">
                            <Image
                                alt="user"
                                src="/user.svg"
                                width={0}
                                height={0}
                                sizes="100vw"

                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <h1 className="pl-[5px] ">Jullyana Melo</h1>
                    </div>
                    <div className=" w-[25px] h-[25px] flex items-center">
                        <Link href={"/login"}>
                            <Image
                                alt="out"
                                src="/out.svg"
                                width={0}
                                height={0}
                                sizes="100vw"

                                style={{ width: '100%', height: 'auto' }}
                            /></Link>
                    </div>
                </div>
                <div className="w-full h-[15px] bg-[#46494C]"></div>
                <div>
                    <h1 className="text-2xl font-semibold py-4 pl-[70px] text-[#46494C]">Protocolos</h1>
                    <div className="flex justify-center">
                        <table className="w-[93%] text-center border-collapse ">

                            <thead>
                                <tr className="bg-[#46494C] text-[#E0FF41] h-[40px] font-semibold text-left "  >
                                    <th className="rounded-tl-lg pl-10"> Nº Protocolo</th>
                                    <th> Beneficiário</th>
                                    <th> CPF</th>
                                    <th > Serviço</th>
                                    <th > Tipo</th>
                                    <th className="rounded-tr-lg"> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dadosretornados.length > 0 ? (
                                    dadosExibidos.map((item, index) => (

                                        <tr key={index} className="h-[25px] bg-gray-100 border-b text-left hover:bg-[#D9D9D9]" onClick={solicitacaoBeneficiario} >
                                            <td className="pl-10 py-2">{item.n_protocolo}</td>
                                            <td> {item.beneficiarios_cpf_beneficiario.nome}</td>
                                            <td> {item.beneficiarios_cpf}</td>
                                            <td> {item.servico}</td>
                                            <td> {item.tipo}</td>
                                            <td> {item.status}</td>
                                        </tr>
                                    ))
                                ) :
                                retornoSearchRadio.length > 0 ? (
                                        retornoSearchRadio.map((item, index) => (
                                            <tr key={index} className="h-[25px] bg-gray-100 border-b text-left hover:bg-[#D9D9D9]" onClick={solicitacaoBeneficiario}>
                                                <td className="pl-10 py-2">{item.n_protocolo}</td>
                                                <td> {item.beneficiarios_cpf_beneficiario.nome}</td>
                                                <td> {item.beneficiarios_cpf}</td>
                                                <td> {item.servico}</td>
                                                <td> {item.tipo}</td>
                                                <td> {item.status}</td>
                                                </tr>
                                                ))):(<></>)
                                            }
                                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <Image
                            alt="arrowDoublePaginationLeft"
                            src="/arrowDoublePaginationLeft.svg"
                            width={22}
                            height={22}
                        />
                    </button>
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        <Image
                            alt="arrowPaginationLeft"
                            src="/arrowPaginationLeft.svg"
                            width={12}
                            height={12}
                        />
                    </button>

                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(startPage + i)}
                            className={`px-2 py-1 text-sm rounded  ${currentPage === startPage + i
                                ? "bg-[#46494C] text-[#E0FF41]"
                                : ""
                                }`}
                        >
                            {startPage + i}
                        </button>
                    ))}

                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}

                    >
                        <Image
                            alt="arrowPaginationRight"
                            src="/arrowPaginationRight.svg"
                            width={12}
                            height={12}
                        />
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}

                    >
                        <Image
                            alt="arrowDoublePaginationRight"
                            src="/arrowDoublePaginationRight.svg"
                            width={22}
                            height={22}
                        />
                    </button>
                </div>
                <div className="flex flex-row justify-center pt-[20px]">



                </div>

            </div>
        </>
    );
}