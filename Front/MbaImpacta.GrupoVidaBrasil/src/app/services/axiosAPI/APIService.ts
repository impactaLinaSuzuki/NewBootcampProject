import axios, { AxiosResponse } from "axios";

export const getAPI = (
  url: string,
  extraParam?: any
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { ...(extraParam || {}) })
      .then((response: AxiosResponse) => {
        if (response) resolve(response);
        else reject();
      })
      .catch((error: any) => reject(error));
  });
};

export const postAPI = (
  url: string,
  data: any,
  extraParam?: any
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { ...(extraParam || {}) })
      .then((response: AxiosResponse) => {
        if (response) resolve(response);
        else reject();
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const putAPI = (
  url: string,
  data: any,
  extraParam?: any
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, { ...(extraParam || {}) })
      .then((response: AxiosResponse) => {
        if (response) resolve(response);
        else reject();
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const deleteAPI = (
  url: string,

  extraParam?: any
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { ...(extraParam || {}) })
      .then((response: AxiosResponse) => {
        if (response) resolve(response);
        else reject();
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
