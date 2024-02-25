export async function ParseTime(time: string) {
    const UNIX = Math.round(Date.parse(time) / 1000);
    return `<t:${UNIX}:R>`;
}

export async function TruncateLength(str: string, length: number) {
    if (str.length <= length) return str;
    return str.substring(0, length);
}
