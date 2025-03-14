import {ChangeEventHandler } from "react";

export default function LabelSelect({ label, asterisco ,colorBg, value, setValue, }: LabelSelectProps) {
    return (

        <div className="flex flex-col gap-2 pt-2 md:flex pr-7">
            <label className="font-semibold pb-0">
                {label} <span className="text-alert font-bold">{asterisco}</span>
            </label>
            <select  value={value} onChange={setValue} className={ `h-8  outline-none min-w-52 bg-${colorBg}`}>
                <option value=""></option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="prefiro nao informar">Prefiro não Informar</option>
            </select>
        </div>

    )
}

type LabelSelectProps = {
    label: string;
    asterisco?: string;
    colorBg: string;
    value: string;
    setValue:ChangeEventHandler<HTMLSelectElement>;
    required: boolean
}