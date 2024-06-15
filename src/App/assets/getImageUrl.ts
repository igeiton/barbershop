export const getImageUrl = (path: string): string => {
    return new URL(`./${path}`, import.meta.url).href;
};
