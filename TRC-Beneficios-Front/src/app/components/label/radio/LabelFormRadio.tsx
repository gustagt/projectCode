import { ChangeEventHandler } from "react";

export default function LabelFormRadio({ label, value, id, familyName, setValue, required
}: LabelFormRadioProps) {
    return (

        <label className="">
            <input className="mr-2" type="radio" value={value} id={id} name={familyName} onChange={setValue} required={required} ></input>
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
    required: boolean

};