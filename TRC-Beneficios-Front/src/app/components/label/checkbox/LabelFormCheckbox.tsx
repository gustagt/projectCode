export default function LabelFormCheckbox({required} : LabelFormCheckboxProps){
    return (    
        <>
    <label>
        <input type="checkbox" required={required}></input>
        <a className="font-semibold"> Declaro serem verdadeiras as informações supracitadas, estando ciente das penalidades no Código Penal Brasileiro, arts. 171 e 299. *</a>
    </label>
    </>
    )
}
type LabelFormCheckboxProps = {

    required: boolean

};