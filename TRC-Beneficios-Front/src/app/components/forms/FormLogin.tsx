'use client'
import { FormEvent, useState } from "react";
import BotaoPesquisa from "../botoes/BotaoPesquisa";
import Header from "../header/Header";
import LabelFormInput from "../label/LabelFormInput";
import { IUsers } from "@/lib/interfaces/IUsers";
import authService from "@/lib/service/auth.service";

import { useRouter } from "next/navigation";

export default function FormLogin() {

  const [user, setUser] = useState<IUsers>({
    username:"",
    password:""
  })


  const router = useRouter()

  async function handleSubmit(e: FormEvent){
    e.preventDefault()

    const resUsuario = await authService.postLogin(user)
    console.log(resUsuario);
    
    if(resUsuario?.status === 200) return router.push("/formulario-idoso")

  }


  return (
    <>
      <Header
        title={"CREDENCIAL DE ESTACIONAMENTO"}
        text={"Sistema Interno"} path={""}      
        ></Header>

      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center ">
        <div className="pt-[180] text-[#46494C] font-semibold text-2xl">
          LOGIN
        </div>
        <div className="bg-white w-64  justify-evenly  space-y-5">
          <div className="flex flex-row gap-2">
            <LabelFormInput label={"Login:"} colorBg={"[#EEEEEE]"} type={"text"} value={user.username} setValue={(e) => setUser({...user, username: e.target.value})} required></LabelFormInput>
          </div>
          <div className="flex flex-row gap-3">
            <LabelFormInput label={"Senha:"} colorBg={"[#EEEEEE]"} type={"password"} value={user.password} setValue={(e) => setUser({...user, password: e.target.value})} required></LabelFormInput>
          </div>
          <div className="cursor-pointer w-full flex justify-end">
            <BotaoPesquisa name={"Pesquisar"} />
          </div>
        </div>
      </form>
    </>
  );
}
