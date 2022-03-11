import { AxiosRequestConfig } from "axios";

export const defaultAxiosConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
};

export const formAxiosConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 5000,
};

export const blobAxiosConfig: AxiosRequestConfig = {
  responseType: "blob",
};
