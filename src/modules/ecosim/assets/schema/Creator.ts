import { z } from "zod";
import { Creator } from "../types";

export default z.object({
    Id: z.number(),
    Name: z.string(),
    Type: z.number(),
    CreatorProfileLink: z.string(),
}) satisfies z.ZodType<Creator>;
