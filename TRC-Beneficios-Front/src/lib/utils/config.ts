export const api = process.env.NEXT_PUBLIC_API_HOST || "/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestConfig = (method: string, data: any, token?: string) => {
  let config: RequestInit;

  if (method === "DELETE" || data === null) {
    config = {
      method: method,
      headers: {},
    };
  } else {
    config = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers = {
      ...config.headers, // Preserva os headers existentes
      Authorization: token,
    };
  }


  return config;
};
