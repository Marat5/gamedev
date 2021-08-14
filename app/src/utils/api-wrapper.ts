import {
  ApiRequestProps, ApiResponse, ErrorApiResponse, ResponseStatus,
} from 'api/types';
import { is } from 'typescript-is';

type RequestConfig = {
  body?: string | FormData,
  params?: any
};

export const callApi: (params: ApiRequestProps) => Promise<ApiResponse> = async ({
  method,
  url,
  data,
  params,
  responseFormat = 'json',
}) => {
  const response: ApiResponse = {
    status: ResponseStatus.SUCCESS,
    data: null,
  };

  const requestConfig: RequestConfig = {};

  const headers = new Headers();

  if (data) {
    if (data instanceof FormData) {
      requestConfig.body = data;
    } else {
      requestConfig.body = JSON.stringify(data);
      headers.append('Content-Type', 'application/json');
    }
  }

  if (params) {
    requestConfig.params = params;
  }

  await fetch(url, {
    mode: 'cors',
    method,
    credentials: 'include',
    headers,
    ...requestConfig,
  })
    .then((resp) => {
      if (!resp.ok) {
        return resp.json();
      }
      return resp.ok ? resp[responseFormat]() : resp.json();
    })
    .then((respData) => {
      if (respData && is<ErrorApiResponse>(respData)) {
        throw new Error(respData.reason);
      }
      response.data = respData;
    })
    .catch((error) => {
      if (error.response?.data?.reason) {
        throw new Error(error.response.data.reason);
      } else {
        throw new Error(error.message);
      }
    });
  return response;
};
