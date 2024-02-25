import { Asset, GetAssetBatch } from ".";
import api from "../internal/api";
import AssetSearch from "./schema/AssetSearch";
import { AssetInfo, AssetSmall } from "./types";

export async function SearchAssets(
    keyword: string,
    category = "Featured",
    limit = 28,
    sortType = 0
): Promise<Asset[]> {
    //https://economy-simulator.org/apisite/catalog/v1/search/items?category=Featured&limit=28&sortType=0&keyword=Blue
    const apiUrl = new URL(await api("catalog", "v1", "search", "items"));
    apiUrl.searchParams.set("category", category);
    apiUrl.searchParams.set("limit", String(limit));
    apiUrl.searchParams.set("sortType", String(sortType));
    apiUrl.searchParams.set("keyword", keyword);

    let decoded: AssetSmall[];
    try {
        const response = await fetch(apiUrl).then((r) => r.text());
        const body = JSON.parse(response);
        const validated = await AssetSearch.parseAsync(body);
        decoded = validated.data;
    } catch (err) {
        throw "Invalid response from server";
    }

    const converted = decoded.map(({ id }) => id);
    return GetAssetBatch(...converted);
}
