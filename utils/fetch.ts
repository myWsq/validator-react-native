import { AsyncStorage } from 'react-native';
import { TOKEN_LABEL } from './config';
import { stringify } from 'query-string';
export const BASE_URL = 'http://192.168.0.104:3003';

/** 包装请求头 */
const getHeader = async () => {
	/** 获得储存在本地的token */
	const token = await AsyncStorage.getItem(TOKEN_LABEL);
	/** 拼装鉴权头 */
	const authorization = token ? `JWT ${token}` : '';

	const header = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json',
	});
	if (token) {
		header.append('Authorization', authorization);
	}
	return header;
};

export const get = async (
	url: string,
	query?: {
		[key: string]: any;
	}
) => {
	let fullUrl = BASE_URL + url;
	if (query) {
		fullUrl += `?${stringify(query)}`;
	}
	return fetch(fullUrl, {
		method: 'GET',
		headers: await getHeader(),
	});
};

export const post = async (
	url: string,
	body?: any,
	query?: {
		[key: string]: any;
	}
) => {
	let fullUrl = BASE_URL + url;
	if (query) {
		fullUrl += `?${stringify(query)}`;
	}
	return fetch(fullUrl, {
		method: 'POST',
		headers: await getHeader(),
		body: JSON.stringify(body),
	});
};
