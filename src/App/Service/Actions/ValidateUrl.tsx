export const validateUrl = (path: string): boolean => {
    if (path.replace(/-/g, '').length !== 8 || path.length !== 10) {
        return false;
    }

    return true;
};
