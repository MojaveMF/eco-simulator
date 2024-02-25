import { z } from "zod";
import { AssetRestrictionIcon } from "../types";

export enum CSSTag {
    Empty = "",
    Limited = "limited",
    LimitedUnique = "limited-unique",
}

export default z.object({
    CssTag: z.nativeEnum(CSSTag),
}) satisfies z.ZodType<AssetRestrictionIcon>;
