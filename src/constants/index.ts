export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;

export const BUNNY = {
    STREAM_BASE_URL: "https://video.bunnycdn.com/library",
    STORAGE_BASE_URL: "https://sg.storage.bunnycdn.com/ro-snap",
    CDN_URL: "https://ro-snap-cast.b-cdn.net",
    EMBED_URL: "https://iframe.mediadelivery.net/embed",
    TRANSCRIPT_URL: "https://vz-77b96bf4-e44.b-cdn.net",
};

export const emojis = ["😂", "😍", "👍"];

export const filterOptions = [
    "Most Viewed",
    "Most Recent",
    "Oldest First",
    "Least Viewed",
];

export const visibilities: Visibility[] = ["public", "private"];

export const ICONS = {
    record: "/assets/icons/record.svg",
    close: "/assets/icons/close.svg",
    upload: "/assets/icons/upload.svg",
};

export const initialVideoState = {
    isLoaded: false,
    hasIncrementedView: false,
    isProcessing: true,
    processingProgress: 0,
};

export const infos = ["transcript", "metadata"];

export const DEFAULT_VIDEO_CONFIG = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    frameRate: { ideal: 30 },
};

export const DEFAULT_RECORDING_CONFIG = {
    mimeType: "video/webm;codecs=vp9,opus",
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
};

export const dummyCards = [
    {
        id:'1',
        title:'SnapChat Message - 30 June 2025',
        thumbnail:'/assets/samples/thumbnail (1).png',
        createdAt:new Date("2025-05-01"),
        userImg:'/assets/images/jason.png',
        username:'Jason',
        views:10,
        visibility:'public',
        duration:156,
    },
    {
        id:'2',
        title:'Morning Vlog - New York Streets',
        thumbnail:'/assets/samples/thumbnail (2).png',
        createdAt:new Date("2025-04-15"),
        userImg:'/assets/images/alex.png',
        username:'Alex',
        views:245,
        visibility:'private',
        duration:420,
    },
    {
        id:'3',
        title:'React Tips & Tricks for Beginners',
        thumbnail:'/assets/samples/thumbnail (3).png',
        createdAt:new Date("2025-03-22"),
        userImg:'/assets/images/david.png',
        username:'David',
        views:1500,
        visibility:'public',
        duration:960,
    },
    {
        id:'4',
        title:'Highlights - Local Cricket Tournament',
        thumbnail:'/assets/samples/thumbnail (4).png',
        createdAt:new Date("2025-02-10"),
        userImg:'/assets/images/emily.png',
        username:'Emily',
        views:876,
        visibility:'public',
        duration:300,
    },
    {
        id:'5',
        title:'Cooking Challenge: 10 Minute Pasta',
        thumbnail:'/assets/samples/thumbnail (5).png',
        createdAt:new Date("2025-01-18"),
        userImg:'/assets/images/jessica.png',
        username:'Jessica',
        views:512,
        visibility:'private',
        duration:240,
    },
    {
        id:'6',
        title:'Gaming Stream Recap - Valorant Clutch',
        thumbnail:'/assets/samples/thumbnail (6).png',
        createdAt:new Date("2025-05-10"),
        userImg:'/assets/images/lisa.png',
        username:'Lisa',
        views:3200,
        visibility:'public',
        duration:1280,
    },
    {
        id:'7',
        title:'Travel Guide - Exploring Tokyo',
        thumbnail:'/assets/samples/thumbnail (7).png',
        createdAt:new Date("2025-04-01"),
        userImg:'/assets/images/michael.png',
        username:'Michael',
        views:2200,
        visibility:'public',
        duration:860,
    },
    {
        id:'8',
        title:'Workout Routine - 20 Minute Full Body',
        thumbnail:'/assets/samples/thumbnail (8).png',
        createdAt:new Date("2025-03-05"),
        userImg:'/assets/images/sarah.png',
        username:'Sarah',
        views:780,
        visibility:'private',
        duration:1200,
    },
];