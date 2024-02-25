import { z } from "zod";
import ItemElement from "./ItemElement";
import { Data } from "../types";

export default z.object({
    TotalItems: z.number().nonnegative(),
    Start: z.number().nonnegative(),
    End: z.number(),
    Page: z.number().nonnegative(),
    nextPageCursor: z.string().nullable(),
    previousPageCursor: z.string().nullable(),
    ItemsPerPage: z.number().nonnegative(),
    PageType: z.string(),
    Items: z.array(ItemElement),
}) satisfies z.ZodType<Data>;
