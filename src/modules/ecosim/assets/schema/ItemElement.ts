import { z } from "zod";
import AssetRestrictionIcon from "./AssetRestrictionIcon";
import ItemItem from "./ItemItem";
import Creator from "./Creator";
import Product from "./Product";
import { ItemElement } from "../types";

export default z.object({
    AssetRestrictionIcon: AssetRestrictionIcon,
    Item: ItemItem,
    Creator: Creator,
    Product: Product,
    PrivateSeller: z.null(),
    Thumbnail: z.object({}),
    UserItem: z.object({}),
}) satisfies z.ZodType<ItemElement>;
