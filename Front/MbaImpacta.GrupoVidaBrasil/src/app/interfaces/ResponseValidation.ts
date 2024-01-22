import { ErroApi } from './ErroApi';

export interface ResponseValidation {
	status: number;
	isValid: boolean;
	errors: ErroApi[];
}
