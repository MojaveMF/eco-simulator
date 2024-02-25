import { z } from "zod";
import { AssetSmall } from "../types";

export default z.object({
    itemType: z.literal("Asset"),
    id: z.number(),
}) satisfies z.ZodType<AssetSmall>;
