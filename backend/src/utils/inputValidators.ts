export const isNonEmptyString = (value: any, maxLength: number) => {
    if (typeof value !== "string") return false;
    const trimmed = value.trim();
    return trimmed.length > 0 && trimmed.length <= maxLength;
};

export const isValidEmail = (email: any) => {
    if (typeof email !== "string") return false;
    const trimmed = email.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(trimmed) && trimmed.length <= 254;
};

export const isStrongPassword = (password: any) => {
    if (typeof password !== "string") return false;
    // at least 8 chars, one upper, one lower, one digit
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
};
