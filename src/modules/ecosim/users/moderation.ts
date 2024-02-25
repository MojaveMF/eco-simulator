import adminApi from "../internal/adminApi";
import fetch from "../internal/fetch";

export const SECCOND = 1000;
export const MINUTE = 60 * SECCOND;
export const HOUR = 60 * MINUTE;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;

export async function Moderate(
    userId: number,
    reason: string,
    who: string = "Unkown Caller",
    duration?: number
) {
    const requestUrl = await adminApi("ban");
    const expires = duration == undefined ? "" : new Date(Date.now() + duration).toISOString();

    const body = {
        expires,
        internalReason: `Moderated by ${who} using discord bot`,
        reason: reason + ` Note: Moderated by ${who} using discord bot`,
        userId: String(userId),
    };

    try {
        const response = await fetch(requestUrl, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(body),
        });
        if (response.status != 200) throw "Invalid Status Code got " + String(status);
    } catch (err) {
        throw "Failed to ban user";
    }

    return;
}

export async function UnModerate(userId: number): Promise<undefined> {
    const url = await adminApi("unban");
    const body = { userId };

    try {
        const { status } = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(body),
        });
        if (status != 200) throw "Invalid status Code";
    } catch (err) {
        throw "Failed to unmoderate account";
    }

    return;
}
