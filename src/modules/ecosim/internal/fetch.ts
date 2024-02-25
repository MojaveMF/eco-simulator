import config from "../../../config";

export default function (url: URL | RequestInfo, data?: RequestInit): Promise<Response> {
    if (data === undefined) {
        data = {
            headers: config.Server.Authentication.Headers,
        };
    } else {
        if (data.headers) {
            data.headers = {
                ...data.headers,
                ...config.Server.Authentication.Headers,
            };
        } else {
            data.headers = config.Server.Authentication.Headers;
        }
    }

    return fetch(url, data);
}
