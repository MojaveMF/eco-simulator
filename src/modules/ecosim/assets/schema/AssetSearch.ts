import { z } from "zod";
import AssetSmall from "./AssetSmall";
import { AssetSerach } from "../types";

export default z.object({
    _total: z.number().nonnegative(),
    keyword: z.string(),
    elasticsearchDebugInfo: z.any().nullable(),
    nextPageCursor: z.string().nullable(),
    previousPageCursor: z.string().nullable(),
    data: z.array(AssetSmall),
}) satisfies z.ZodType<AssetSerach>;
