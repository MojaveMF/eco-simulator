import { z } from "zod";
import { AssetInfo } from "../types";

export default z.object({
    id: z.number().nonnegative(),
    assetType: z.number().nonnegative(),
    name: z.string(),
    description: z.string().nullable(),
    genres: z.array(z.string()),
    creatorType: z.string(),
    creatorTargetId: z.number(),
    creatorName: z.string(),
    offsaleDeadline: z.string().nullable(),
    itemRestrictions: z.array(z.any()),
    saleCount: z.number().nonnegative(),
    itemType: z.string(),
    favoriteCount: z.number().nonnegative(),
    isForSale: z.boolean(),
    price: z.number().nonnegative().nullable(),
    priceTickets: z.number().nonnegative().nullable(),
    lowestPrice: z.number().nullable(),
    priceStatus: z.string().nullable(),
    lowestSellerData: z.any().nullable(),
    unitsAvailableForConsumption: z.any().nullable(),
    serialCount: z.number(),
    is18Plus: z.boolean(),
    moderationStatus: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
}) satisfies z.ZodType<AssetInfo>;
