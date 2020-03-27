export declare const EMPTY_USER: IAuthProviderProps['user'];
export interface IAuthProviderProps {
    user: {
        email: string;
        username: string;
        role: string;
        token: string;
    };
    api: Record<string, {
        url: string;
        method: string;
    }>;
    authRequestFn?: (email: string, password: string) => Promise<{
        user: IAuthProviderProps['user'];
        error: string;
    }>;
}
