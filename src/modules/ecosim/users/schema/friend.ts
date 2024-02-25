import { z } from "zod";
import { FriendUser } from "../types";

export default z.object({
    isOnline: z.boolean(),
    isDeleted: z.boolean(),
    isBanned: z.boolean(),
    id: z.number(),
    name: z.string(),
    displayName: z.string(),
    description: z.string().nullable(),
    created: z.string(),
    presenceType: z.number(),
    externalAppDisplayName: z.string().nullable(),
    friendFrequentRank: z.number(),
}) satisfies z.ZodType<FriendUser>;
