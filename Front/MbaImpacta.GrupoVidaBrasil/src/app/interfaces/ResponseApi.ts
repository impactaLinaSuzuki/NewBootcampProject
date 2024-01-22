import { AxiosResponse } from 'axios';

export interface ResponseApi<T> extends AxiosResponse<T> {}
