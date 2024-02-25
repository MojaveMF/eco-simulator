import config from "../../../config";

export default async function (...paths: string[]): Promise<string> {
    let apiUrl = `https://${config.Server.Website}/admin-api/api`;

    for (let path of paths) {
        apiUrl += "/" + path;
    }
    return apiUrl;
}
