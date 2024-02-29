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

    /* Check if the response is completed and targetId is correct */
    for (let response of decoded.data) {
        if (response.state != "Completed") continue;
        if (response.targetId != renderId) continue;

        return `https://` + config.Server.Website + response.imageUrl;
    }

    /* Wait for the cooldown */
    await new Promise((resolve) => setTimeout(resolve, cooldown));

    /* Rerun with decreased retries */
    return GetThumbnail(url, renderId, retries - 1, cooldown);
}
