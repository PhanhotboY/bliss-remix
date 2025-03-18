const API_URL = process.env.API_URL || 'http://localhost:3000';

const headers = {
  'x-api-key': process.env.API_APIKEY || '',
  credentials: 'include',
};

const fetcher = async (
  path: string,
  options?: RequestInit & {
    request?: {
      user: {
        id: string;
        usr_firstName: string;
        usr_lastName: string;
        usr_email: string;
        usr_msisdn: string;
      };
      tokens: { accessToken: string; refreshToken: string };
    };
  }
) => {
  const response = await fetch(`${API_URL}/api/v1${path}`, {
    method: 'GET',
    ...options,
    headers: {
      ...headers,
      ...(options?.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...options?.headers,
      'x-client-id': options?.request?.user?.id || '',
      Authorization: options?.request?.tokens?.accessToken || '',
      'x-refresh-token': options?.request?.tokens?.refreshToken || '',
    },
  });

  const data = await response.json();

  if (response.ok) {
    console.log(
      '%s %s \x1b[32m%s\x1b[0m',
      options?.method || 'GET',
      path,
      response.status
    );
  } else {
    console.log(
      '%s %s \x1b[31m%s\x1b[0m',
      options?.method || 'GET',
      path,
      response.status
    );
  }

  if (data.errors) {
    throw new Response(null, {
      status: data.errors.status,
      statusText: data.errors.message,
    });
  }
  return data.metadata;
};

export { fetcher };
