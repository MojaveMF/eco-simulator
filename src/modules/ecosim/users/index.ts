import api from "../internal/api";
import { GetFriends } from "./friends";
import UserSchema from "./schema/user";
import { SearchUsers } from "./search";
import { FriendUser, InternalUser } from "./types";
import fetch from "../internal/fetch";
import { Moderate, UnModerate } from "./moderation";
import { AssetType } from "../assets/enums/AssetType";
import { Asset, GetUserItems } from "../assets";
import { GetThumbnail } from "../internal/renders";
import config from "../../../config";

export class User {
    public id: number;
    public name: string;
    public displayName: string;
    public description: string | null;
    public created: string;
    public isBanned: boolean;

    async GetItems(type: AssetType): Promise<Asset[]> {
        return GetUserItems(this.id, type);
    }

    async GetProfile(): Promise<string> {
        return `https://${config.Server.Website}/users/${this.id}/profile`;
    }

    async GetThumbnail(xy: number = 420): Promise<string> {
        //https://economy-simulator.org/apisite/thumbnails/v1/users/avatar?userIds=1&size=420x420&format=png
        const url = new URL(await api("thumbnails", "v1", "users", "avatar"));
        url.searchParams.set("userIds", String(this.id));
        url.searchParams.set("size", `${xy}x${xy}`);
        url.searchParams.set("format", "png");

        return GetThumbnail(url.toString(), this.id);
    }

    async GetHeadshot(xy: number = 420): Promise<string> {
        //https://economy-simulator.org/apisite/thumbnails/v1/users/avatar?userIds=1&size=420x420&format=png
        const url = new URL(await api("thumbnails", "v1", "users", "avatar-headshot"));
        url.searchParams.set("userIds", String(this.id));
        url.searchParams.set("size", `${xy}x${xy}`);
        url.searchParams.set("format", "png");

        return GetThumbnail(url.toString(), this.id);
    }

    private async DecodeCount(url: string): Promise<number> {
        let response: string;
        try {
            response = await fetch(url).then((r) => r.text());
        } catch (err) {
            throw "Failed to fetch count url";
        }

        let decoded: { count: number };
        try {
            decoded = JSON.parse(response);
        } catch (err) {
            throw "Failed to decode response";
        }

        return decoded.count;
    }

    async Moderate(reason: string, who?: string, duration?: number) {
        return Moderate(this.id, reason, who, duration);
    }

    async RemoveModeration() {
        return UnModerate(this.id);
    }

    async GetFollowingCount(): Promise<number> {
        const requestedURL = await api(
            "friends",
            "v1",
            "users",
            String(this.id),
            "followings",
            "count"
        );
        return this.DecodeCount(requestedURL);
    }
    async GetFollowersCount(): Promise<number> {
        const requestedURL = await api(
            "friends",
            "v1",
            "users",
            String(this.id),
            "followers",
            "count"
        );
        return this.DecodeCount(requestedURL);
    }

    /* This is so jank and slow i know but the count api dosent exist and i need this func */
    async GetFriendsCount(): Promise<number> {
        let friends: FriendUser[];
        try {
            friends = await GetFriends(this.id);
        } catch (err) {
            throw "Failed to get friends";
        }

        return friends.length;
    }

    async GetFriends(): Promise<User[]> {
        let friends: FriendUser[];
        try {
            friends = await GetFriends(this.id);
        } catch (err) {
            throw "Failed to get friends";
        }

        const converted = [];
        for (let friend of friends) {
            converted.push(new User(friend));
        }

        return converted;
    }

    constructor(user: InternalUser | FriendUser) {
        const { id, name, displayName, description, created, isBanned } = user;

        this.isBanned = isBanned;
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.created = created;
    }
}

export async function GetUserFromUserid(UserId: number): Promise<User> {
    const requestUrl = await api("users", "v1", "users", String(UserId));

    let body: InternalUser;
    try {
        const responseText = await fetch(requestUrl).then((r) => r.text());
        body = JSON.parse(responseText);
    } catch (err) {
        throw "Failed to fetch or parse userinfo api";
    }

    try {
        const validated = await UserSchema.parseAsync(body);
        return new User(validated);
    } catch (err) {
        throw "Invalid Response from server";
    }
}

export async function GetUserFromUsername(username: string): Promise<User> {
    const searchResults = await SearchUsers(username);
    const filteredResults = searchResults.filter((v) => v.name == username);

    if (filteredResults.length < 1) throw "No user with that name";

    /* We already "have" the users information but the search api is lossy */
    return GetUserFromUserid(filteredResults[0].id);
}
