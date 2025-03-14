
export function maskCpf(cpf: string){
    const cpfNumber = cpf.replace(/\D/g, '');

    return cpfNumber
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})(\d+?$)/, '$1');

}
function validarPrimeiroDigito (cpfArray: Array<number>) {

    let sum = 0;

    for (let i = 0; i < 9; i ++) {
        sum +=cpfArray[i] * (10 - i);
    }
    const resto = (sum*10) %11;
    if(resto < 10){
        return cpfArray[9] === resto
    }
        return cpfArray[9] === 0
}
function validarSegundoDigito (cpfArray: Array<number>) {

    let sum = 0;

    for (let i = 0; i < 10; i ++) {
        sum +=cpfArray[i] * (11 - i);
    }
    const resto = (sum*10) %11;
    if(resto < 10){
        return cpfArray[10] === resto
    }
        return cpfArray[10] === 0
    
}


export function validateCpf(cpf:string){

    if (cpf.trim() == '') return

    const cpfNumber = cpf
    .replace(/\D/g, '')
    .split('')
    .map((e) => parseInt(e))
    ;
    if(!validarPrimeiroDigito(cpfNumber)) {
        return false;
    }
    if(!validarSegundoDigito(cpfNumber)) {
        return false;
    } 
    if (cpfNumber.length !== 11 || !Array.from(cpfNumber).filter(e => e !== cpfNumber[0]).length) {
        return false
  }
  return
}
