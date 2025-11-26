export const isNonEmptyString = (value: unknown, maxLength: number) => {
    if (typeof value !== "string") return false;
    const trimmed = value.trim();
    return trimmed.length > 0 && trimmed.length <= maxLength;
};

export const isValidEmail = (email: unknown) => {
    if (typeof email !== "string") return false;
    const trimmed = email.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(trimmed) && trimmed.length <= 254;
};

export const isStrongPassword = (password: unknown) => {
    if (typeof password !== "string") return false;
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
};
