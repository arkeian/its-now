export const extractLinks = (html: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return html.match(urlRegex) || [];
};