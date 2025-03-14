import { ChangeEventHandler } from "react";

export default function LabelFormRadio({ label, value, id, familyName, setValue, required, clickEvent}: LabelFormRadioProps) {
    return (

        <label className="">
            <input className="cursor-pointer mr-2" type="radio" value={value} id={id} name={familyName} onChange={setValue} onClick={clickEvent} required={required} ></input>
            {label}
        </label>

    )
}
type LabelFormRadioProps = {
    label: string;
    value: string;
    familyName: string;
    id: string;
    setValue: ChangeEventHandler<HTMLInputElement>;
    required?: boolean
    clickEvent?: (event: React.MouseEvent<HTMLInputElement>) => void;

};