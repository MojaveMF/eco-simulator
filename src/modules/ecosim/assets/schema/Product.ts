import { z } from "zod";
import { Product } from "../types";

export default z.object({
    PriceInRobux: z.number(),
    SerialNumber: z.number().nullable(),
}) satisfies z.ZodType<Product>;
