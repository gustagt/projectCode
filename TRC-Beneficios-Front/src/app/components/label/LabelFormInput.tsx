import { ChangeEventHandler } from "react";

export default function LabelFormInput({ label, asterisco ,colorBg, value, setValue,type, maxNum, placeHolder, onBlur ,required,width, border }: LabelFormInputProps) {
    return (

        <div className="flex flex-col  md:flex pr-7 ">
            <label className="font-semibold pb-0">
                {label} <span className="text-alert font-bold">{asterisco}</span>
            </label>
            <input maxLength={maxNum} type={type} value={value} onChange={setValue} required={required} className={ `w-${width} h-8 outline-none border border-${border} min-w-52 bg-${colorBg} pl-2 `} onBlur={onBlur} placeholder={placeHolder}/>
        </div>

    )
}

type LabelFormInputProps = {
    label: string;
    asterisco?: string;
    colorBg: string;
    type: string;
    value: string;
    maxNum?: number;
    placeHolder?: string,
    onBlur?:  ((event: React.FocusEvent<HTMLInputElement>) => void) ;
    setValue: ChangeEventHandler<HTMLInputElement>;
    required?: boolean;
    width?:string;
    border:string
}