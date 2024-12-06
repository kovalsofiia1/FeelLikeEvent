import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios';
import { setItem, deleteItem, getItem } from "@/src/utils/storage";
import { TOKEN_KEY, API_URL } from '@env';

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null },
    onRegister?: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

console.log(TOKEN_KEY)
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            // const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const token = await getItem(TOKEN_KEY);
            console.log(token);

            if (token) {
                setAuthHeader(token);

                setAuthState({
                    token: token,
                    authenticated: true
                });

            }
        }
        loadToken();
    }, []);
    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth/register`, { email, password, firstName, lastName });
            setAuthState({
                token: result.data.token,
                authenticated: true
            });

            setAuthHeader(result.data.token);

            // await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            await setItem(TOKEN_KEY, result.data.token);
            return result;
        }
        catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    const login = async (email: string, password: string) => {
        try {
            console.log('in auth login');
            const result = await axios.post(`${API_URL}/auth/login`, { email, password });
            console.log(result);
            setAuthState({
                token: result.data.token,
                authenticated: true
            })

            setAuthHeader(result.data.token);

            // await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            await setItem(TOKEN_KEY, result.data.token);
            return result;
        }
        catch (e) {
            console.log(e)
            return { error: true, msg: (e as any).response.data.message };
        }
    }

    const logout = async () => {
        try {
            const result = await axios.post(`${API_URL}/auth/logout`, {});
            setAuthState({
                token: null,
                authenticated: false
            })

            setAuthHeader(null);

            // await SecureStore.deleteItemAsync(TOKEN_KEY);
            await deleteItem(TOKEN_KEY);
            return result;
        }
        catch (e) {
            return { error: true, msg: (e as any).response.data.msg };
        }
    }

    const setAuthHeader = (token: string | null) => {
        axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    }

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
