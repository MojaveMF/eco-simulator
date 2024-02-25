import config from "../../../config";
import DataSchema from "./schema/Data";
import { AssetType } from "./enums/AssetType";
import { AssetInfo, Data, ItemElement } from "./types";
import fetch from "../internal/fetch";
import api from "../internal/api";
import { z } from "zod";
import AssetInfoSchema from "./schema/AssetInfo";
import { SearchAssets } from "./search";
import { GetThumbnail } from "../internal/renders";

async function formatName(name: string) {
    return name.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
}

export class Asset {
    public id: number;
    public assetType: number;
    public name: string;
    public description: null | string;
    public genres: string[];
    public creatorType: string;
    public creatorTargetId: number;
    public creatorName: string;
    public offsaleDeadline: null | string;
    public itemRestrictions: any[];
    public saleCount: number;
    public itemType: string;
    public favoriteCount: number;
    public isForSale: boolean;
    public price: number | null;
    public priceTickets: number | null;
    public lowestPrice: null | number;
    public priceStatus: null | string;
    public lowestSellerData?: any | null;
    public unitsAvailableForConsumption?: any | null;
    public serialCount: number;
    public is18Plus: boolean;
    public moderationStatus: string;
    public createdAt: string;
    public updatedAt: string;

    async GetCatalog(): Promise<string> {
        const name = await formatName(this.name);
        return `https://${config.Server.Website}/catalog/${this.id}/${name}`;
    }

    async GetThumbnail(xy: number = 420): Promise<string> {
        //economy-simulator.org/apisite/thumbnails/v1/assets?assetIds=3473&format=png&size=420x420

        const url = new URL(await api("thumbnails", "v1", "assets"));
        url.searchParams.set("assetIds", String(this.id));
        url.searchParams.set("size", `${xy}x${xy}`);
        url.searchParams.set("format", "png");

        return GetThumbnail(url.toString(), this.id);
    }

    constructor(assetInfo: AssetInfo) {
        this.id = assetInfo.id;
        this.assetType = assetInfo.assetType;
        this.name = assetInfo.name;
        this.description = assetInfo.description;
        this.genres = assetInfo.genres;
        this.creatorType = assetInfo.creatorType;
        this.creatorTargetId = assetInfo.creatorTargetId;
        this.creatorName = assetInfo.creatorName;
        this.offsaleDeadline = assetInfo.offsaleDeadline;
        this.itemRestrictions = assetInfo.itemRestrictions;
        this.saleCount = assetInfo.saleCount;
        this.itemType = assetInfo.itemType;
        this.favoriteCount = assetInfo.favoriteCount;
        this.isForSale = assetInfo.isForSale;
        this.price = assetInfo.price;
        this.priceTickets = assetInfo.priceTickets;
        this.lowestPrice = assetInfo.lowestPrice;
        this.priceStatus = assetInfo.priceStatus;
        this.lowestSellerData = assetInfo.lowestSellerData;
        this.unitsAvailableForConsumption = assetInfo.unitsAvailableForConsumption;
        this.serialCount = assetInfo.serialCount;
        this.is18Plus = assetInfo.is18Plus;
        this.moderationStatus = assetInfo.moderationStatus;
        this.createdAt = assetInfo.createdAt;
        this.updatedAt = assetInfo.updatedAt;
    }
}

/** @description Fetches the items of that type and returns the item elements */
async function GetUserItemsRaw(
    userid: number,
    assetType: AssetType,
    itemsPerPage: number
): Promise<ItemElement[]> {
    const requestUrl = `https://${config.Server.Website}/users/inventory/list-json?userId=${userid}&assetTypeId=${assetType}&cursor=&itemsPerPage=${itemsPerPage}`;
    let response: string;
    try {
        response = await fetch(requestUrl).then((r) => r.text());
    } catch (err) {
        throw "Failed to request user items";
    }

    let body: Data;
    try {
        body = await DataSchema.parseAsync(JSON.parse(response).Data);
    } catch (err) {
        throw "Invalid data returned from server";
    }

    return body.Items;
}

export async function GetUserItems(
    userid: number,
    assetType: AssetType,
    itemsPerPage = 24
): Promise<Asset[]> {
    const rawItems = await GetUserItemsRaw(userid, assetType, itemsPerPage);
    const itemsIds = rawItems.map((raw) => raw.Item.AssetId);

    return (await GetAssetBatch(...itemsIds)).map((v) => new Asset(v));
}

async function ConvertId(id: number) {
    return { id: String(id), itemType: "Asset" };
}

export async function GetAssetBatch(...ids: number[]): Promise<Asset[]> {
    const apiUrl = await api("catalog", "v1", "catalog", "items", "details");
    const items = await Promise.all(ids.map(ConvertId));
    const body = JSON.stringify({ items });

    let responseBody: string;
    try {
        responseBody = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        }).then((r) => r.text());
    } catch (err) {
        throw "Failed to get response";
    }

    let decodedResponse: AssetInfo[];
    try {
        const response: { data: unknown } = JSON.parse(responseBody);
        decodedResponse = await z.array(AssetInfoSchema).parseAsync(response.data);
    } catch (err) {
        throw "Failed to parse response from server";
    }

    return decodedResponse.map((v) => new Asset(v));
}

export async function GetAssetInfo(id: number): Promise<Asset> {
    const response = await GetAssetBatch(id);
    if (response.length != 1) throw "Invalid Response from server";

    return new Asset(response[0]);
}

export async function GetAssetInfoFromName(AssetName: string): Promise<Asset> {
    const results = await SearchAssets(AssetName);
    const filtered = results.filter(({ name }) => name === AssetName);

    if (filtered.length < 1) throw "Invalid AssetId. no asset found";

    return filtered[0];
}
