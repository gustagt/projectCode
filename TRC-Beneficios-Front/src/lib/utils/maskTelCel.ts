export default function maskTelCel(telMask:string){
    const telNumber = telMask.replace(/\D/g, '');
    if (telNumber.length <= 13)
    return telNumber
    .replace(/(\d{2})(\d)/, '($1)$2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
    else if (telNumber.length <= 14){
        return telNumber
        .replace(/(\d{2})(\d)/, '($1)$2')
        .replace(/(\d)(\d{5})$/, '$1-$2')
    }
}