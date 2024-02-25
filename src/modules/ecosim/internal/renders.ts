import config from "../../../config";
import fetch from "./fetch";

type RenderResponseCompleted = {
    targetId: number;
    state: "Completed";
    imageUrl: string;
};

type RenderResponseNotComplete = {
    targetId: number;
    state: "Pending";
    imageUrl: null;
};

type RenderResponse = RenderResponseCompleted | RenderResponseNotComplete;

export async function GetThumbnail(
    url: string,
    renderId: number,
    retries: number = 3,
    cooldown: number = 250
): Promise<string> {
    let body: string;
    try {
        body = await fetch(url).then((r) => r.text());
    } catch (err) {
        throw "Failed to request render api";
    }

    let decoded: { data: RenderResponse[] };
    try {
        decoded = JSON.parse(body);
    } catch (err) {
        throw "Failed to decode response";
    }

    for (let response of decoded.data) {
        if (response.state != "Completed") continue;
        if (response.targetId != renderId) continue;

        return `https://` + config.Server.Website + response.imageUrl;
    }

    await new Promise((resolve) => setTimeout(resolve, cooldown));

    return GetThumbnail(url, renderId, retries - 1, cooldown);
}
