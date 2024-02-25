import config from "../../../config";

export default async function (
    namespace: string,
    version: string,
    ...paths: string[]
): Promise<string> {
    let apiUrl = `https://${config.Server.Website}/apisite/${namespace}/${version}`;

    for (let path of paths) {
        apiUrl += "/" + path;
    }

    return apiUrl;
}
