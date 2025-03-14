'use client'

import { usePathname, useRouter } from "next/navigation"
import Header from "../header/Header"
import LabelFile from "../label/file/LabelFile"
import LabelFormInput from "../label/LabelFormInput"
import LabelFormRadio from "../label/radio/LabelFormRadio"
import LabelFormCheckbox from "../label/checkbox/LabelFormCheckbox"
import { FormEvent,useState } from "react"
import { IBeneficiario } from "@/lib/interfaces/IBeneficiario"
import LabelSelect from "../label/select/LabelSelect"
import BotaoPesquisa from "../botoes/BotaoPesquisa"
import { maskCpf, validateCpf } from "@/lib/utils/maskCpf"
import formService from "@/lib/service/form.service"
import maskCEP from "@/lib/utils/maskCEP"
import maskTelCel from "@/lib/utils/maskTelCel"
import { api } from "@/lib/utils/config"
import { IForms } from "@/lib/interfaces/IForms"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNBTUFjY291bnROYW1lIjoianVsbHlhbmEubWVsbyIsIm5hbWUiOiJDTj1KdWxseWFuYSBHbGF1Y2lhIGRlIG1lbG8ifSwiaWF0IjoxNzQxMjYyOTc1LCJleHAiOjE3NDE3ODEzNzV9.SYNpy0U4xCA9KwZ-HhgsRax9Iy0Ajx9DK7rG75Phnec'


export default function Form() {


    const pathname = usePathname()

    const [beneficiario, setBeneficiario] = useState<IBeneficiario>({
        nome: "",
        cpf: "",
        data_nascimento: "",
        genero: "",
        email: "",
        telefone: "",
        celular: "",
        deficiencia: "",
        cep: "",
        rua: "",
        num_complemento: "",
        num: "",
        complemento: "",
        bairro: "",
        cidade: "",
        representante_legal: "",
        c_documentos:""
        
    })
    
    const [files, setFiles] = useState<{ docSol?: File; docResp?: File; compEnd?: File; laudo?: File }>({});
    
    const [entregaCrd, setEntregaCrd] = useState<string>('')

    function consultaCep() {

        if (!beneficiario.cep) return
        const cepNoMask = beneficiario.cep.replace(/\D/g, '');
        if (beneficiario.cep.length < 8) {
            return
        }
        else {
            const url = `https://viacep.com.br/ws/${cepNoMask}/json/`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.erro === 'true')
                        return alert("CEP Inválido")
                    else {
                        setBeneficiario({
                            ...beneficiario, 
                            bairro: data.bairro,
                            rua: data.logradouro,
                            cidade: data.localidade

                        });
                    }
                })


        }
    }
    
    const handleValidateCpf = () => {
        const cpfValidate = validateCpf(beneficiario.cpf)

        if (cpfValidate === false) {
            alert("CPF Inválido")
        }
    }


   
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (e.target.files && e.target.files[0]) {
            setFiles((prevFiles) => ({
                ...prevFiles,
                [field]: e.target.files![0],
            }));
        }
    };
    
    const router = useRouter()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const entregaCredencial: IForms = {
            beneficiario :{...beneficiario, 
                cpf: beneficiario.cpf.replace(/\D/g, ''), 
                celular:beneficiario.celular?.replace(/\D/g, ''), 
                telefone: beneficiario.telefone?.replace(/\D/g, ''),
                cep: beneficiario.cep?.replace(/\D/g, '')
            },
            entregaCrd
        }


        
        const resForm = await formService.postForm(entregaCredencial, token, pathname === "/formulario-deficiente" ? "Deficiente" : "Idoso")
        
        const dataProtocol = resForm.data;
        
        const formData = new FormData();
        
        if (files.docResp) formData.append("docResp", files.docResp)
        if (files.compEnd) formData.append("compEnd", files.compEnd)
        if (files.docSol) formData.append("docSol", files.docSol)
        if (files.laudo) formData.append("laudo", files.laudo)


        
        const resUpload = await fetch(`${api}/uploads/${dataProtocol.n_protocolo}`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: token,
        },
        
    });

    if(resUpload?.status === 200) return router.push("/menu-beneficios")

    

}

    return (
        <>
        <form onSubmit={handleSubmit} className="bg-[#46494C] h-full">
            {pathname === "/formulario-deficiente" && <div >
                <Header
                    path={"/menu-beneficios"}
                    title={"Solicitação de Emissão - Credencial para Deficiente"}
                    text={"Credencial de Estacionamento Especial para Pessoas com Deficiência ou Mobilidade Reduzida Formulário a ser preenchido pelo candidato ou seu representante legal para concessão do benefício de Credencial de Estacionamento Especial para Pessoas com Deficiência ou Mobilidade Reduzida, conforme Portaria TransCon nº 016, de 19 de julho de 2021. Para dúvidas e demais informações, gentileza encaminhar para "}
                    email={"beneficios.transcon@contagem.mg.gov.br."}
                />
            </div>}
            {pathname === "/formulario-idoso" && <div>
                <Header
                    path={"/menu-beneficios"}
                    title={"Solicitação de Emissão - Credencial para Idoso"}
                    text={"Formulário a ser preenchido pelo candidato ou seu representante legal para concessão do benefício de Credencial de Estacionamento Especial para Pessoas Idosas, conforme Portaria TransCon nº016, de 19 de julho de 2021. Para dúvidas e demais informações, gentileza encaminhar para "}
                    email={"beneficios.transcon@contagem.mg.gov.br."}
                />
            </div>}

            <div className=" max-w-6xl mx-auto  p-7 ">
                <h4 className="font-bold text-white pb-7 pt-7">Obs.: Campos com asterisco (<span className="text-alert font-semibold">*</span>) são de preenchimento obrigatório.</h4>
                <div className="bg-[#EEEEEE] rounded-xl pl-7 pb-9 pt-4 ">
                    <h2 className="font-bold text-xl pb-3">Dados Pessoais:</h2>
                    <div className="grid grid-cols-[_1fr] sm:grid-cols-[_1fr] md:grid-cols-[1fr_350px] lg:grid-cols-[700px_1fr] ">
                        <div className="">
                            <LabelFormInput
                                    label={"Nome: "}
                                    asterisco="*"
                                    colorBg={"write"}
                                    type={"text"}
                                    value={beneficiario.nome || ""}
                                    setValue={(e) => setBeneficiario({ ...beneficiario, nome: e.target.value })}
                                    required border={"none"}                            />
                        </div>
                        <div>
                            <LabelFormInput
                                    label={"CPF: "}
                                    asterisco="*"
                                    colorBg={"write"}
                                    type={"text"}
                                    value={beneficiario.cpf}
                                    setValue={(e) => {
                                        const noMaskCpf = e.target.value
                                        const maskInCpf = maskCpf(noMaskCpf) || ""
                                        setBeneficiario({ ...beneficiario, cpf: maskInCpf })
                                    } }
                                    onBlur={handleValidateCpf}
                                    required
                                    placeHolder=" Digite um CPF somente números" border={"none"}                            />
                        </div>
                    </div>
                    <div className=" grid grid-cols-[_1fr] sm:grid-cols-[_1fr] md:grid-cols-[1fr_350px] lg:grid-cols-[350px_350px_1fr]">
                        <div className="">
                            <LabelFormInput
                                    label={"Data de Nascimento: "}
                                    asterisco="*"
                                    colorBg={"write"}
                                    type={"date"}
                                    value={beneficiario.data_nascimento || ""}
                                    setValue={(e) => setBeneficiario({ ...beneficiario, data_nascimento: e.target.value })}
                                    required border={"none"}                            />
                        </div>
                        <div className="">
                            <LabelSelect
                                label={"Sexo"}
                                colorBg={"write"}
                                asterisco="*"
                                value={beneficiario.genero || ""}
                                setValue={(e) => setBeneficiario({ ...beneficiario, genero: e.target.value })}
                                required
                            />
                        </div>
                        <div className="">
                            <LabelFormInput
                                    label={"E-mail: "}
                                    asterisco="*"
                                    colorBg={"write"}
                                    type={"email"}
                                    value={beneficiario.email || ""}
                                    setValue={(e) => setBeneficiario({ ...beneficiario, email: e.target.value })}
                                    required border={"none"}                            />
                        </div>
                    </div>
                    {pathname === "/formulario-deficiente" && <>
                        <div className="grid grid-cols-[_1fr] sm:grid-cols-[_1fr] md:grid-cols-[1fr_350px] lg:grid-cols-[350px_350px_1fr]">
                            <div>
                                <LabelFormInput
                                        label={"Telefone: "}
                                        colorBg={"write"}
                                        type={""}
                                        value={beneficiario.telefone || ""}
                                        maxNum={13}
                                        setValue={(e) => {
                                            const telNoMask = e.target.value
                                            const telMask = maskTelCel(telNoMask) || ""
                                            setBeneficiario({ ...beneficiario, telefone: telMask })
                                        } } border={"none"}                                />
                            </div>
                            <div>
                                <LabelFormInput
                                        label={"Celular: "}
                                        asterisco="*"
                                        colorBg={"write"}
                                        type={""}
                                        value={beneficiario.celular || ""}
                                        maxNum={14}
                                        setValue={(e) => {
                                            const telNoMask = e.target.value
                                            const telMask = maskTelCel(telNoMask) || ""
                                            setBeneficiario({ ...beneficiario, celular: telMask })
                                        } }
                                        required border={"none"}                                />
                            </div>
                            <div>
                                <LabelFormInput
                                    label={"Tipo de Deficiência: "}
                                    asterisco="*"
                                    colorBg={"write"}
                                    type={""}
                                    value={beneficiario.deficiencia || ""}
                                    setValue={(e) => setBeneficiario({ ...beneficiario, deficiencia: e.target.value })}
                                    required border={"none"}   
                                />
                            </div></div></>}

                    {pathname === "/formulario-idoso" && <>
                        <div className="grid grid-cols-[_1fr] sm:grid-cols-[_1fr] md:grid-cols-[1fr_350px] lg:grid-cols-[525px_1fr]">
                            <div>
                                <LabelFormInput
                                    label={"Telefone: "}
                                    colorBg={"write"}
                                    type={""}
                                    value={beneficiario.telefone || ""}
                                    maxNum={13}
                                    setValue={(e) => {
                                        const telNoMask = e.target.value;
                                        const telMask = maskTelCel(telNoMask) || "";
                                        setBeneficiario({ ...beneficiario, telefone: telMask })
                                    }} border={"none"}   
                                />
                            </div>
                            <div>
                                <LabelFormInput
                                    label={"Celular: "}
                                    asterisco="*"
                                    colorBg={"write"}
                                    type={""}
                                    value={beneficiario.celular || ""}
                                    maxNum={14}
                                    setValue={(e) => {
                                        const telNoMask = e.target.value;
                                        const telMask = maskTelCel(telNoMask) || "";
                                        setBeneficiario({ ...beneficiario, celular: telMask })
                                    }} border={"none"}   
                                    required />
                            </div>
                        </div>
                    </>}
                    <LabelFile
                        label={"Documento oficial com foto do solicitante. (Frente e Verso) "}
                        asterisco={"*"} 
                        type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                        setValue={(e) => handleFileChange(e, "docSol")}
                        required
                        nameInput={"docSol"}
                    />
                    <span>{}</span>
                </div>
            </div>
            <div className=" max-w-6xl mx-auto p-7">
                <div className="bg-[#EEEEEE] max-w-6xl rounded-xl p-7 pb-9">
                    <h2 className="font-bold text-xl pb-3">Endereço:</h2>
                    <div className="grid grid-cols-[_1fr] sm:grid-cols-[_1fr] md:grid-cols-[1fr_350px] lg:grid-cols-[350px_1fr]">
                        <div className="w-15">
                            <LabelFormInput
                                label={"CEP: "}
                                asterisco="*"
                                colorBg={"write"}
                                type={""}
                                value={beneficiario.cep || ""}
                                maxNum={9}
                                setValue={(e) => {
                                    const noMaskCep = e.target.value;
                                    const cepInMask = maskCEP(noMaskCep) 
                                    setBeneficiario({ ...beneficiario, cep: cepInMask })
                                }}
                                onBlur={consultaCep}
                                required border={"none"}   
                            />
                        </div>
                        <div>
                            <LabelFormInput
                                label={"Rua/Avenida: "}
                                asterisco="*"
                                colorBg={"write"}
                                type={""}
                                value={beneficiario.rua || ""}
                                setValue={(e) => setBeneficiario({ ...beneficiario, rua: e.target.value })}
                                required border={"none"}   
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-[_1fr] sm:grid-cols-[_1fr] md:grid-cols-[1fr_350px] lg:grid-cols-[350px_1fr]">
                        <div className="">
                            <LabelFormInput
                                label={"Número: "}
                                asterisco="*"
                                colorBg={"write"}
                                type={""}
                                value={beneficiario.num || ""}
                                setValue={(e) => setBeneficiario({ ...beneficiario, num: e.target.value })}
                                required border={"none"}   
                            />
                        </div>
                        <div className="">
                            <LabelFormInput
                                label={"Complemento: "}
                                colorBg={"write"}
                                type={""}
                                value={beneficiario.complemento || ""}
                                setValue={(e) => setBeneficiario({ ...beneficiario, complemento: e.target.value })}
                                border={"none"}   
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-[_1fr] sm:grid-cols-[_1fr] md:grid-cols-[1fr_350px] lg:grid-cols-[525px_1fr]">
                        <div>
                            <LabelFormInput
                                label={"Bairro: "}
                                colorBg={"write"}
                                type={""}
                                value={beneficiario.bairro || ""}
                                setValue={(e) => setBeneficiario({ ...beneficiario, bairro: e.target.value })}
                                required border={"none"}   
                            />
                        </div>
                        <div>
                            <LabelFormInput
                                label={"Cidade: "}
                                asterisco="*"
                                colorBg={"write"}
                                type={""}
                                value={beneficiario.cidade || ""}
                                setValue={(e) => setBeneficiario({ ...beneficiario, cidade: e.target.value })}
                                required border={"none"}   
                            />
                        </div>
                    </div>
                    <LabelFile
                        label={"Comprovante de residência do mês vigente ou anterior. "}
                        asterisco={"*"}
                        type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                        setValue={(e) => handleFileChange(e, "compEnd") }
                        required
                        nameInput={"compEnd"}
                    />
                    <span></span>
                </div>
            </div>
            <div className=" max-w-6xl mx-auto p-7">
                <div className="bg-[#EEEEEE] max-w-6xl rounded-xl p-7 pb-12">
                    <h2 className="font-bold text-xl pb-3">Informações Adicionais:</h2>
                    <h3 className="pb-1 font-semibold">Representante Legal? <span className="text-alert font-semibold">*</span></h3>
                    <div className="grid grid-row-2">
                        <div>
                            <LabelFormRadio
                                label={"Sim"}
                                value={"sim"}
                                familyName={"respLegal"}
                                id={"sim"}
                                setValue={(e) => setBeneficiario({ ...beneficiario, representante_legal: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <LabelFormRadio
                                label={"Não"}
                                value={"nao"}
                                familyName={"respLegal"}
                                id={"nao"}
                                setValue={(e) => setBeneficiario({ ...beneficiario, representante_legal: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    {beneficiario.representante_legal === "sim" && (

                        <div>
                            <LabelFile
                                label={"Documento oficial com foto do Rep. Legal (Frente e Verso)"}
                                asterisco={"*"}
                                type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                                setValue={(e) => handleFileChange(e, "docResp")}
                                required
                                nameInput={"docResp"}
                            />

                        </div>
                    )}
                    <h3 className="pb-1 font-semibold pt-5">Como prefere obter sua credencial? <span className="text-alert font-semibold">*</span></h3>
                    <div className="grid grid-row-2"><div>
                        <LabelFormRadio 
                        label={"Retirar na TransCon - AGUARDE CONTATO"} 
                        value={'1'} 
                        familyName={"entrega"} 
                        id={"1"} 
                        setValue={(e) => setEntregaCrd(e.target.value)}
                        required />
                    </div>
                        <div>
                            <LabelFormRadio
                                label={"Entrega pelos correios"}
                                value={'0'}
                                familyName={"entrega"}
                                id={"0"}
                                setValue={(e) => setEntregaCrd(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {pathname === "/formulario-deficiente" &&
                        <div>
                            <LabelFile
                                label={"Laudo pericial, emitido em ate 06(seis) meses anteriores à data de solicitação da Credencial, exceto se a deficiência for congênita, em que o lado apresentado poderá ser de qualquer data, com assinatura do médico ou fisioterapeuta responsável pelo diagnóstico e carimbo que conste nome e número de registro do profissional no respectivo Conselho Regional."}
                                asterisco={"*"}
                                type={"Extensões permitidas: doc, docx, pdf, jpg, jpeg, png."}
                                setValue={(e) => handleFileChange(e, "laudo") }
                                required
                                nameInput={"laudo"}
                            />
                            <span>{ }</span>
                        </div>}
                    <div className="pt-5">
                        <LabelFormCheckbox
                            required
                        />
                    </div>
                </div>
                <div className="pt-9 flex justify-end">
                    <BotaoPesquisa name={"Enviar"}></BotaoPesquisa>
                </div>

            </div>
        </form>
        </>
    )
}

