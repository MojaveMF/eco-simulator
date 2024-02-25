import { z } from "zod";
import { ItemItem } from "../types";

export default z.object({
    AssetId: z.number().nonnegative(),
    UniverseId: z.number().nonnegative().nullable(),
    Name: z.string(),
    AbsoluteUrl: z.string(),
    AssetType: z.number(),
}) as z.ZodType<ItemItem>;
