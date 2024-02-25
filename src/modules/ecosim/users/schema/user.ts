import { z } from "zod";
import { InternalUser } from "../types";

export default z.object({
    id: z.number().nonnegative(),
    name: z.string(),
    displayName: z.string(),
    description: z.string().nullable(),
    created: z.string(),
    isBanned: z.boolean(),
}) satisfies z.ZodType<InternalUser>;
