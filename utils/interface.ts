export enum ResponseCode {
	SUCCESS = 0,
	USERNAME_EXIST = 1,
	USERNAME_NOT_EXIST = 2,
	INVALID_PASSWORD = 3,
}

export interface Response {
	code: ResponseCode;
	data?: any;
	message?: any;
}
