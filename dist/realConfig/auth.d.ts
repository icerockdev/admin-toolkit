export declare const authRequestFn: (host: string) => (email: string, password: string) => Promise<{
    user: {
        id?: number | undefined;
        email?: string | undefined;
        username?: string | undefined;
        role?: string | undefined;
        token?: string | undefined;
    };
    tokens: Record<string, string>;
    error: string;
}>;
