import { z } from "zod";
import { SearchUser, UserSearchResults } from "../types";

export const SearchUserSchema = z.object({
    UserId: z.number().nonnegative(),
    Name: z.string(),
    DisplayName: z.string(),
    Blurb: z.string(),
    PreviousUserNamesCsv: z.string(),
    IsOnline: z.boolean(),
    LastLocation: z.unknown().nullable(),
    UserProfilePageUrl: z.string(),
    LastSeenDate: z.unknown().nullable(),
    PrimaryGroup: z.string(),
    PrimaryGroupUrl: z.string(),
}) satisfies z.ZodType<SearchUser>;

export const SearchUserResult = z.object({
    Keyword: z.string(),
    StartIndex: z.number().nonnegative(),
    MaxRows: z.number().nonnegative(),
    TotalResults: z.number(),
    UserSearchResults: z.array(SearchUserSchema),
}) satisfies z.ZodType<UserSearchResults>;
