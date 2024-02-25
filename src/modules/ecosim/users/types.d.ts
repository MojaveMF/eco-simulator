export type FriendUser = {
    isOnline: boolean;
    isDeleted: boolean;
    isBanned: boolean;
    id: number;
    name: string;
    displayName: string;
    description: string | null;
    created: string;
    presenceType: number;
    externalAppDisplayName: string | null;
    friendFrequentRank: number;
};

export type Currency = {
    robux: number;
    tickets: number;
};

export type SearchUser = {
    UserId: number;
    Name: string;
    DisplayName: string;
    Blurb: string;
    PreviousUserNamesCsv: string;
    IsOnline: boolean;
    LastLocation?: unknown | null;
    UserProfilePageUrl: string;
    LastSeenDate?: unknown | null;
    PrimaryGroup: string;
    PrimaryGroupUrl: string;
};

export type UserSearchResults = {
    Keyword: string;
    StartIndex: number;
    MaxRows: number;
    TotalResults: number;
    UserSearchResults: SearchUser[];
};

export type InternalUser = {
    id: number;
    name: string;
    displayName: string;
    description: string | null;
    created: string;
    isBanned: boolean;
};
