export default function maskCEP (cep : string){
    return cep.replace(/(\d{5})(\d{3})/g, '$1-$2')

}