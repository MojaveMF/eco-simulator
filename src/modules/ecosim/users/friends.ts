import api from "../internal/api";
import { z } from "zod";
import friendSchema from "./schema/friend";
import { FriendUser } from "./types";
import fetch from "../internal/fetch";

async function RequestFriends(userid: number): Promise<string> {
    const requestUrl = await api("friends", "v1", "users", String(userid), "friends");
    let response: string;
    try {
        response = await fetch(requestUrl).then((r) => r.text());
    } catch (err) {
        throw `Failed to request ${requestUrl}`;
    }

    return response;
}

async function DecodeResponse(body: string): Promise<FriendUser[]> {
    let response: { data: FriendUser[] };
    try {
        response = JSON.parse(body);
    } catch (err) {
        throw "Invalid Response from server [COULDNT PARSE JSON]";
    }

    return await z.array(friendSchema).parse(response.data);
}

export async function GetFriends(userid: number): Promise<FriendUser[]> {
    let responseBody: string;
    try {
        responseBody = await RequestFriends(userid);
    } catch (err) {
        throw "Failed to get response body";
    }

    return await DecodeResponse(responseBody);
}
