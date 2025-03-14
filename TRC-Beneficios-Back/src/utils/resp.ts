export function respE( status: number,error: string, data = {}) {
  return { status, message: error, data };
}

export function resp(status: number, message: string, data: any) {
  return { status, message, data };
}
