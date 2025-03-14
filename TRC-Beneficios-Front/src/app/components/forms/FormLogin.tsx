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
    
    if(resUsuario?.status === 200) return router.push("/dashboard")

  }


  return (
    <>
    <div className="flex flex-col items-center md:gap-[180px]">
      <Header
        title={"CREDENCIAL DE ESTACIONAMENTO"}
        text={"Sistema Interno"} path={""}      
        ></Header>

      <form onSubmit={handleSubmit} className="flex flex-col justify-items-center items-center">
        <div className=" text-[#46494C] font-semibold text-2xl">
          LOGIN
        </div>
        <div className="bg-white w-[300px]   space-y-2">
          <div >
            <LabelFormInput 
            width="[300px]" 
            label={"Login:"} 
            colorBg={"[#EEEEEE]"} 
            type={"text"} 
            value={user.username} 
            setValue={(e) => setUser({ ...user, username: e.target.value })} 
            required 
            border={""}
            />
          </div>
          <div >
            <LabelFormInput 
            width="[300px]" 
            label={"Senha:"} 
            colorBg={"[#EEEEEE]"} 
            type={"password"} 
            value={user.password} 
            setValue={(e) => setUser({ ...user, password: e.target.value })} 
            required 
            border={""}
            />
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
