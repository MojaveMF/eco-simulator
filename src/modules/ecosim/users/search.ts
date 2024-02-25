import config from "../../../config";
import { SearchUserResult } from "./schema/searchUser";
import { InternalUser, SearchUser, UserSearchResults } from "./types";
import fetch from "../internal/fetch";

async function ConvertUserLossy(from: SearchUser): Promise<InternalUser> {
    return {
        id: from.UserId,
        name: from.Name,
        displayName: from.DisplayName,
        description: from.Blurb,
        created: "",
        isBanned: false,
    };
}

async function searchUsersInternal(
    query: string,
    maxRows: number,
    startIndex: number
): Promise<SearchUser[]> {
    const url = new URL(`https://${config.Server.Website}/search/users/results`);
    url.searchParams.set("keyword", query);
    url.searchParams.set("maxRows", String(maxRows));
    url.searchParams.set("startIndex", String(startIndex));

    let body: string;
    try {
        body = await fetch(url).then((r) => r.text());
    } catch (err) {
        throw "Failed to request api";
    }

    let decoded: UserSearchResults;
    try {
        decoded = JSON.parse(body);
    } catch (err) {
        throw "Failed to decode search results";
    }

    return (await SearchUserResult.parseAsync(decoded)).UserSearchResults;
}

export async function SearchUsers(
    query: string,
    maxRows = 12,
    startindex = 0
): Promise<InternalUser[]> {
    const users = await searchUsersInternal(query, maxRows, startindex);

    return Promise.all(users.map(ConvertUserLossy));
}
