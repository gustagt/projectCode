import Image from "next/image";
import { ChangeEventHandler } from "react";


export default function LabelFile({ label, type, asterisco, setValue,required, nameInput }: LabelFileProps) {
    return <>
        <div className="flex flex-col gap-2">
            <label className="font-semibold pt-5 ">
                {label} <span className="text-alert font-bold">{asterisco}</span>
            <div className="w-[160px] h-8 rounded-md bg-[#46494C] flex justify-content items-center gap-1 pl-1 mt-2">
                <input className="hidden " name={nameInput} type="file" multiple onChange={setValue} required={required} 
                accept="
                image/jpg,
                image/jpeg,
                image/png,
                application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                application/pdf
                "></input>
                <Image
                    alt="Document"
                    src="/Document.svg"
                    width={20}
                    height={26}
                    ></Image>
                <a className="text-[#E0FF41] font-medium text-sm ">Escolher Arquivos</a>
            </div>
                    </label>
            <h1 className="text-alert font-normal">{type}</h1>
        </div>
    </>
}
type LabelFileProps = {
    label: string;
    type: string;
    asterisco?: string;
    setValue: ChangeEventHandler<HTMLInputElement>;
    required?: boolean
    nameInput:string;
};