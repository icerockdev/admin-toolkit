import { IAuthProviderProps } from '../../types/auth';
import { AuthProvider } from '../AuthProvider';
export declare class JWTAuthProvider extends AuthProvider {
    tokens: Record<string, string>;
    authRequestFn?: (email: string, password: string) => Promise<{
        user: IAuthProviderProps['user'];
        tokens: Record<string, string>;
        error: string;
    }>;
    constructor(fields?: Partial<IAuthProviderProps>);
    sendAuthRequest: ({ email, password, }: {
        email: string;
        password: string;
    }) => void;
    sendAuthRequestCancel: () => void;
    logout: () => void;
    withToken: (req: any, args: any) => any;
    get isLogged(): boolean;
}
